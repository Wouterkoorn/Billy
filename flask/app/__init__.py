from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import datetime
import time

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://python:luca@mariadb:3306/billydb"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Kenniskaart(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    titel = db.Column(db.String(255))
    auteur = db.Column(db.String(255))
    what = db.Column(db.String(1023))
    why = db.Column(db.String(1023))
    how = db.Column(db.String(1023))
    voorbeeld = db.Column(db.String(255))
    bronnen = db.Column(db.String(255))
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
    print(data)
    kennistkaart = Kenniskaart(
        titel=data['titel'],
        auteur=data['auteur'],
        what=data['what'],
        why=data['why'],
        how=data['how'],
        voorbeeld=data['voorbeeld'],
        bronnen=data['bronnen'],
        datetime=datetime.datetime.now()
    )
    db.session.add(kennistkaart)
    db.session.flush()  # Stuurt data naar database zonder permanent op te slaan, hierdoor kan hieronder de correcte kenniskaart.id gebruikt worden

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


@app.route('/api/ophalen/kenniskaart/<kenniskaart_id>', methods=['GET'])
def vraag_kenniskaart(kenniskaart_id):
    kenniskaart = serialize(Kenniskaart.query.filter_by(id=kenniskaart_id).all())[0]

    rollen = []
    for rol in Rol.query.with_entities(Rol.rolnaam).filter_by(kenniskaart_id=kenniskaart_id).all():
        rollen.append(rol[0])
    kenniskaart.update({'rollen': rollen})

    competenties = []
    for competentie in Competentie.query.with_entities(Competentie.categorie, Competentie.competentie).filter_by(kenniskaart_id=kenniskaart['id']).all():
        competenties.append(dict(zip(['catergorie', 'competentie'], competentie)))
    kenniskaart.update({'competentie': competenties})

    hbois = []
    for hboi in Hboi.query.with_entities(Hboi.architectuurlaag, Hboi.fase, Hboi.niveau).filter_by(kenniskaart_id=kenniskaart['id']).all():
        hbois.append(dict(zip(['architectuurlaag', 'fase', 'niveau'], hboi)))
    kenniskaart.update({'hboi': hbois})

    return jsonify(kenniskaart), 200


@app.route('/api/ophalen/recent', methods=['GET'])
def vraag_recente_kenniskaarten():
    kenniskaarten = []
    for kenniskaart in Kenniskaart.query.with_entities(Kenniskaart.id, Kenniskaart.titel, Kenniskaart.what, Kenniskaart.datetime).order_by(
            db.desc(Kenniskaart.datetime)).limit(5).all():
        # Het gebruik van '.with_entities()' hierboven geeft tuples zonder keys, die keys worden hieronder toegevoegd
        kenniskaarten.append(dict(zip(['id', 'titel', 'what', 'datetime'], kenniskaart)))

    return jsonify(kenniskaarten), 200


@app.route('/api/ophalen/zoekfilter/<filterstring>/', methods=['GET'])
def filter_kenniskaarten(filterstring):
    return filterstring


@app.route('/api/ophalen/zoeken/<zoekvraag>', methods=['GET'])
def zoek_kenniskaarten(zoekvraag):
    velden_list = [Kenniskaart.titel, Kenniskaart.what, Kenniskaart.why, Kenniskaart.how, Kenniskaart.voorbeeld, Kenniskaart.bronnen]
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
    Rol.query.filter_by(kenniskaart_id=kenniskaart_id).delete()
    Competentie.query.filter_by(kenniskaart_id=kenniskaart_id).delete()
    Hboi.query.filter_by(kenniskaart_id=kenniskaart_id).delete()
    db.session.commit()
    return jsonify({'success': True}), 200
