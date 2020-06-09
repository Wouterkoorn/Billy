from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
import time

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://python:luca@mariadb:3306/billydb"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Kenniskaart(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    titel = db.Column(db.String(255))
    what = db.Column(db.String(1023))
    why = db.Column(db.String(1023))
    how = db.Column(db.String(1023))
    voorbeeld = db.Column(db.String(255))
    datetime = db.Column(db.TIMESTAMP, default=datetime.datetime.now())

    rollen = db.relationship('Rol', backref='kenniskaart', lazy=True)
    competenties = db.relationship('Competentie', backref='kenniskaart', lazy=True)
    hboi = db.relationship('Hboi', backref='kenniskaart', lazy=True)


class Rol(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    kenniskaart_id = db.Column(db.Integer, db.ForeignKey('kenniskaart.id'), nullable=False)
    rolnaam = db.Column(db.String(255))


class Competentie(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    kenniskaart_id = db.Column(db.Integer, db.ForeignKey('kenniskaart.id'), nullable=False)
    categorie = db.Column(db.String(255))
    competentie = db.Column(db.String(255))


class Hboi(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    kenniskaart_id = db.Column(db.Integer, db.ForeignKey('kenniskaart.id'), nullable=False)
    architectuurlaag = db.Column(db.String(255))
    fase = db.Column(db.String(255))
    niveau = db.Column(db.Integer)


while True:
    try:
        db.create_all()
    except Exception as e:
        print(e)
        time.sleep(1)
        continue
    break


@app.route('/api/toevoegen', methods=['POST'])
def plaats_kenniskaart():
    data = request.json

    kennistkaart = Kenniskaart(
        titel=data['titel'],
        what=data['what'],
        why=data['why'],
        how=data['how'],
        voorbeeld=data['voorbeeld'],
        datetime=datetime.datetime.now()
    )
    db.session.add(kennistkaart)
    db.session.flush() #Stuurt data naar database zonder permanent op te slaan, hierdoor kan hieronder de correcte kenniskaart.id gebruikt worden

    for rol in data['rollen']:
        rol_relatie = Rol(
            kenniskaart_id=kennistkaart.id,
            rolnaam=rol,
        )
        db.session.add(rol_relatie)

    for competentie in data['competentie']:
        competentie_relatie = Competentie(
            kenniskaart_id=kennistkaart.id,
            categorie=competentie['categorie'],
            competentie=competentie['competentie'],
        )
        db.session.add(competentie_relatie)

    for hboi in data['hboi']:
        hboi_relatie = Hboi(
            kenniskaart_id=kennistkaart.id,
            architectuurlaag=hboi['architectuurlaag'],
            fase=hboi['fase'],
            niveau=hboi['niveau'],
        )
        db.session.add(hboi_relatie)

    db.session.commit()

    return jsonify({'success': True}), 200


def serialize(query):
    queryList = []
    for i in query:
        # SQLAlchemy __dict__ object heeft een instance state die niet ge-returned hoeft te worden
        del i.__dict__['_sa_instance_state']
        queryList.append(i.__dict__)
    return queryList


@app.route('/api/ophalen', methods=['GET'])
def vraag_alle_kenniskaarten():
    return jsonify(serialize(Kenniskaart.query.order_by(db.desc(Kenniskaart.datetime)).all())), 200


@app.route('/api/ophalen/kenniskaart/<kenniskaart_id>', methods=['GET'])
def vraag_kenniskaart(kenniskaart_id):
    kenniskaart = Kenniskaart.query.get(kenniskaart_id)
    del kenniskaart.__dict__['_sa_instance_state']
    return jsonify(kenniskaart.__dict__), 200


@app.route('/api/ophalen/recent', methods=['GET'])
def vraag_recente_kenniskaarten():
    return jsonify(serialize(Kenniskaart.query.order_by(db.desc(Kenniskaart.datetime)).limit(5).all())), 200


@app.route('/api/ophalen/zoekfilter/<filterstring>/', methods=['GET'])
def filter_kenniskaarten(filterstring):
    return filterstring


@app.route('/api/ophalen/zoeken/<zoekvraag>', methods=['GET'])
def zoek_kenniskaarten(zoekvraag):
    velden_list = [Kenniskaart.titel, Kenniskaart.what, Kenniskaart.why, Kenniskaart.how, Kenniskaart.voorbeeld,
                   Kenniskaart.rol, Kenniskaart.vaardigheid, Kenniskaart.hboi]
    kenniskaarten_exact, kenniskaarten_inclusief = [], []

    for zoekveld in velden_list:
        exact_zoekvraag = serialize(Kenniskaart.query.filter(zoekveld.ilike(zoekvraag)))
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


@app.route('/api/verwijderen/kenniskaart/<kenniskaart_id>', methods=['DELETE'])
def verwijder_kenniskaart(kenniskaart_id):
    Kenniskaart.query.filter_by(id=kenniskaart_id).delete()
    db.session.commit()
    return jsonify({'success': True}), 200
