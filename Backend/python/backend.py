import sqlalchemy
import datetime
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, DateTime, desc
from sqlalchemy.ext.declarative import declarative_base
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

engine = sqlalchemy.create_engine('mysql+pymysql://python:luca@localhost/billydb')
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()


class Kennistkaart(Base):
    __tablename__ = 'kenniskaarten'

    id = Column(Integer, primary_key=True, autoincrement=True)
    titel = Column(String(255))
    what = Column(String(1023))
    why = Column(String(1023))
    how = Column(String(1023))
    voorbeeld = Column(String(255))
    rol = Column(String(255))
    vaardigheid = Column(String(255))
    hboi = Column(String(255))
    datetime = Column(DateTime, default=datetime.datetime.now())


Base.metadata.create_all(engine)


@app.route('/toevoegen', methods=['POST'])
def plaats_kenniskaart():
    data = request.json

    kennistkaart = Kennistkaart(
        titel=data['titel'],
        what=data['what'],
        why=data['why'],
        how=data['how'],
        voorbeeld=data['voorbeeld'],
        rol=data['rol'],
        vaardigheid=data['vaardigheid'],
        hboi=data['hboi'],
    )

    session.add(kennistkaart)
    session.commit()

    return jsonify({'success': True}), 200


@app.route('/ophalen', methods=['GET'])
def vraag_alle_kenniskaarten():
    kenniskaartenList = []

    for i in session.query(Kennistkaart).order_by(desc(Kennistkaart.datetime)).all():
        # SQLAlchemy __dict__ object heeft een instance state die niet gereturnd hoeft te worden
        kenniskaartDict = dict(i.__dict__);
        del kenniskaartDict['_sa_instance_state']
        kenniskaartenList.append(kenniskaartDict)

    return jsonify(kenniskaartenList)


@app.route('/ophalen/recent', methods=['GET'])
def vraag_recente_kenniskaarten():
    kenniskaartenList = []

    for i in session.query(Kennistkaart).order_by(desc(Kennistkaart.datetime)).limit(5).all():
        kenniskaartDict = dict(i.__dict__);
        del kenniskaartDict['_sa_instance_state']
        kenniskaartenList.append(kenniskaartDict)

    return jsonify(kenniskaartenList)


@app.route('/ophalen/zoeken/<zoekvraag>', methods=['GET'])
def zoek_kenniskaart(zoekvraag):
    kenniskaartenList = []

    for i in session.query(Kennistkaart).order_by(desc(Kennistkaart.datetime)).all():
        kenniskaartDict = dict(i.__dict__);
        del kenniskaartDict['_sa_instance_state']
        kenniskaartenList.append(kenniskaartDict)

    results, kenniskaartentitels = [], []

    for item in kenniskaartenList:

        titel = str(item['titel'])
        kenniskaartentitels.append(titel)

        def bestResult(resultSort):
            num = resultSort.lower().find(zoekvraag.lower())
            return num

        if zoekvraag.lower() in titel.lower():
            results.append(titel)

        elif titel.lower() in zoekvraag.lower():
            results.append(titel)

    if len(results) == 0:
        return 'Geen resultaten gevonden.'

    else:
        sorted(results, key=bestResult, reverse=False)

        kaarten = []

        for i in results:
            kaarten.append(kenniskaartenList[kenniskaartentitels.index(i)])

        return jsonify(kaarten), 200


app.run(host='0.0.0.0', port='56743')
