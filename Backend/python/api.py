import sqlalchemy
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, TIMESTAMP
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
    datetime = Column(TIMESTAMP)


Base.metadata.create_all(engine)


@app.route('/toevoegen', methods=['POST'])
def voeg_kenniskaart_toe():
    data = request.json

    kennistkaart = Kennistkaart(
        titel=data['titel'],
        what=data['what'],
        why=data['why'],
        how=data['how'],
        voorbeeld=data['voorbeeld'],
        rol=data['rol'],
        vaardigheid=data['vaardigheid'],
        hboi=data['hboi']
    )

    session.add(kennistkaart)
    session.commit()

    return jsonify({'success': True}), 200

def kenniskaartGetAll():
    kenniskaartenList = []
    for i in session.query(Kennistkaart).all():
        kenniskaartDict = {
            "titel": i.titel,
            "what": i.what,
            "why": i.why,
            "how": i.how,
            "voorbeeld": i.voorbeeld,
            "rol": i.rol,
            "vaardigheid": i.vaardigheid,
            "hboi": i.hboi
        }
        kenniskaartenList.append(kenniskaartDict)

    return kenniskaartenList

@app.route('/ophalen', methods=['GET'])
def vraag_kenniskaart_op():
    return jsonify(kenniskaartGetAll())


@app.route('/ophalen/<zoekvraag>', methods=['GET'])
def zoek_kenniskaart(zoekvraag):
    kenniskaartenList = kenniskaartGetAll()
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
