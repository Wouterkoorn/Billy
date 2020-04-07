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
    titel = Column(String)
    what = Column(String)
    why = Column(String)
    how = Column(String)
    voorbeeld = Column(String)
    rol = Column(String)
    vaardigheid = Column(String)
    hboi = Column(String)
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


@app.route('/ophalen', methods=['GET'])
def vraag_kenniskaart_op():
    return session.query(Kennistkaart).all()


app.run(host='0.0.0.0', port='56743')
