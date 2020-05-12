from flask import Flask, jsonify, request
import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://python:luca@localhost/billydb"
db = SQLAlchemy(app)


class Kenniskaart(db.Model):
    __tablename__ = 'kenniskaarten'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    titel = db.Column(db.String(255))
    what = db.Column(db.String(1023))
    why = db.Column(db.String(1023))
    how = db.Column(db.String(1023))
    voorbeeld = db.Column(db.String(255))
    rol = db.Column(db.String(255))
    vaardigheid = db.Column(db.String(255))
    hboi = db.Column(db.String(255))
    datetime = db.Column(db.TIMESTAMP, default=datetime.datetime.now())


db.create_all()


@app.route('/toevoegen', methods=['POST'])
def plaats_kenniskaart():
    data = request.json

    kennistkaart = Kenniskaart(
        titel=data['titel'],
        what=data['what'],
        why=data['why'],
        how=data['how'],
        voorbeeld=data['voorbeeld'],
        rol=data['rol'],
        vaardigheid=data['vaardigheid'],
        hboi=data['hboi'],
        datetime=datetime.datetime.now()
    )

    db.session.add(kennistkaart)
    db.session.commit()

    return jsonify({'success': True}), 200

db.create_all()
def serialize(query):
    queryList = []
    for i in query:
        # SQLAlchemy __dict__ object heeft een instance state die niet ge-returned hoeft te worden
        del i.__dict__['_sa_instance_state']
        queryList.append(i.__dict__)
    return queryList


@app.route('/ophalen', methods=['GET'])
def vraag_alle_kenniskaarten():
    return jsonify(serialize(Kenniskaart.query.order_by(db.desc(Kenniskaart.datetime)).all())), 200


@app.route('/ophalen/kenniskaart/<kenniskaart_id>', methods=['GET'])
def vraag_kenniskaart(kenniskaart_id):
    kenniskaart = Kenniskaart.query.get(kenniskaart_id).__dict__
    del kenniskaart['_sa_instance_state']
    return jsonify(kenniskaart), 200


@app.route('/ophalen/recent', methods=['GET'])
def vraag_recente_kenniskaarten():
    return jsonify(serialize(Kenniskaart.query.order_by(db.desc(Kenniskaart.datetime)).limit(5).all())), 200


@app.route('/ophalen/zoeken/<zoekvraag>', methods=['GET'])
def zoek_kenniskaarten(zoekvraag):
    velden_list = [Kenniskaart.titel, Kenniskaart.what, Kenniskaart.why, Kenniskaart.how, Kenniskaart.voorbeeld,
                   Kenniskaart.rol, Kenniskaart.vaardigheid, Kenniskaart.hboi]
    kenniskaarten_exact, kenniskaarten_inclusief = [], []

    for zoekveld in velden_list:
        exact_zoekvraag =  serialize(Kenniskaart.query.filter(zoekveld.ilike(zoekvraag)))
        if len(exact_zoekvraag) > 0:
            for kenniskaart in exact_zoekvraag:
                if kenniskaart not in kenniskaarten_exact and kenniskaart not in kenniskaarten_inclusief:
                    kenniskaarten_exact.append(kenniskaart)

        zoekvraag_inclusief = serialize(Kenniskaart.query.filter(zoekveld.ilike("%" + zoekvraag + "%")))
        if len(zoekvraag_inclusief) > 0:
            for kenniskaart in zoekvraag_inclusief:
                if kenniskaart not in kenniskaarten_exact and kenniskaart not in kenniskaarten_inclusief:
                    kenniskaarten_inclusief.append(kenniskaart)

    kenniskaarten_exact.extend(kenniskaarten_inclusief)
    return jsonify(kenniskaarten_exact), 200


@app.route('/verwijderen/kenniskaart/<kenniskaart_id>', methods=['DELETE'])
def verwijder_kenniskaart(kenniskaart_id):
    Kenniskaart.query.filter_by(id=kenniskaart_id).delete()
    db.session.commit()


app.run(host='0.0.0.0', port='56743')
