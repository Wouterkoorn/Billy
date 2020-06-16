from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import or_

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
    what = db.Column(db.Text)
    why = db.Column(db.Text)
    how = db.Column(db.Text)
    voorbeeld = db.Column(db.Text)
    bronnen = db.Column(db.Text)
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


def serialize(query):
    # SQLAlchemy __dict__ object heeft een instance state die niet ge-returned hoeft te worden
    try:
        queryList = []
        for i in query:
            del i.__dict__['_sa_instance_state']
            queryList.append(i.__dict__)
        return queryList
    except TypeError:
        del query.__dict__['_sa_instance_state']
        return query.__dict__


@app.route('/api/toevoegen', methods=['POST'])
def plaats_kenniskaart():
    data = request.json

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
        rol_relatie = Rol(kenniskaart_id=kennistkaart.id, rolnaam=rol)
        db.session.add(rol_relatie)

    for competentie in data['competenties']:
        competentie_relatie = Competentie(kenniskaart_id=kennistkaart.id, categorie=competentie['categorie'], competentie=competentie['competentie'])
        db.session.add(competentie_relatie)

    for hboi in data['hboi']:
        hboi_relatie = Hboi(kenniskaart_id=kennistkaart.id, architectuurlaag=hboi['architectuurlaag'], fase=hboi['fase'], niveau=hboi['niveau'])
        db.session.add(hboi_relatie)

    db.session.commit()

    return jsonify({'success': True}), 200


@app.route('/api/ophalen/kenniskaart/<kenniskaart_id>', methods=['GET'])
def vraag_kenniskaart(kenniskaart_id):
    kenniskaart = serialize(Kenniskaart.query.filter_by(id=kenniskaart_id).all())[0]

    kenniskaart.update({'rollen': [rol[0] for rol in Rol.query.with_entities(Rol.rolnaam).filter_by(kenniskaart_id=kenniskaart_id).all()]})

    competenties = Competentie.query.with_entities(Competentie.categorie, Competentie.competentie).filter_by(kenniskaart_id=kenniskaart['id']).all()
    kenniskaart.update({'competenties': [dict(zip(['categorie', 'competentie'], competentie)) for competentie in competenties]})

    hbois = Hboi.query.with_entities(Hboi.architectuurlaag, Hboi.fase, Hboi.niveau).filter_by(kenniskaart_id=kenniskaart['id']).all()
    kenniskaart.update({'hboi': [dict(zip(['architectuurlaag', 'fase', 'niveau'], hboi)) for hboi in hbois]})

    return jsonify(kenniskaart), 200


@app.route('/api/ophalen/recent', methods=['GET'])
def vraag_recente_kenniskaarten():
    query = Kenniskaart.query.with_entities(Kenniskaart.id, Kenniskaart.titel, Kenniskaart.what, Kenniskaart.datetime).order_by(
        db.desc(Kenniskaart.datetime)).limit(5).all()

    kenniskaarten = [dict(zip(['id', 'titel', 'what', 'datetime'], kenniskaart)) for kenniskaart in query]

    return jsonify(kenniskaarten), 200


@app.route('/api/ophalen/zoeken', methods=['POST'])
def filter_kenniskaarten():
    data = request.json

    base = 'Kenniskaart.query.join('
    filters = ')'

    if len(data['rollen']) > 0:
        base += 'Rol, '
        rollen = '.filter(or_('
        for rol in data['rollen']:
            rollen += 'Rol.rolnaam=="' + rol + '", '
        filters += rollen + '))'

    if len(data['competenties']) > 0:
        base += 'Competentie, '
        competenties = '.filter(or_('
        for competentie in data['competenties']:
            competenties += 'Competentie.competentie=="' + competentie + '", '
        filters += competenties + '))'

    if len(data['hboi']['architectuurlaag']) > 0 or len(data['hboi']['fase']) > 0 or len(data['hboi']['niveau']) > 0:
        base += 'Hboi, '
        hbois = '.filter(or_('
        for veld in data['hboi']:
            if len(data['hboi'][veld]):
                for i in data['hboi'][veld]:
                    if type(i) == str:
                        hbois += 'Hboi.' + veld + '=="' + i + '", '
                    else:
                        hbois += 'Hboi.' + veld + '==' + str(i) + ', '
        filters += hbois + '))'

    if data['sorteer'] == 'aflopend':
        sorteer = '.order_by(db.desc(Kenniskaart.datetime))'
    else:
        sorteer = '.order_by(db.asc(Kenniskaart.datetime))'

    query1 = base + filters + f""".filter(zoekveld.ilike("{data["zoekterm"]}"))""" + sorteer + '.all()'
    query2 = base + filters + f""".filter(zoekveld.ilike("%" + "{data["zoekterm"]}" + "%"))""" + sorteer + '.all()'

    velden_list = [Kenniskaart.titel, Kenniskaart.auteur, Kenniskaart.what, Kenniskaart.why, Kenniskaart.how, Kenniskaart.voorbeeld, Kenniskaart.bronnen]
    kenniskaarten_exact, kenniskaarten_inclusief = [], []

    for zoekveld in velden_list:
        zoekvraag_exact = serialize(eval(query1))
        if len(zoekvraag_exact) > 0:
            for kenniskaart in zoekvraag_exact:
                if kenniskaart not in kenniskaarten_exact and kenniskaart not in kenniskaarten_inclusief:
                    kenniskaarten_exact.append(kenniskaart)

        zoekvraag_inclusief = serialize(eval(query2))
        if len(zoekvraag_inclusief) > 0:
            for kenniskaart in zoekvraag_inclusief:
                if kenniskaart not in kenniskaarten_exact and kenniskaart not in kenniskaarten_inclusief:
                    kenniskaarten_inclusief.append(kenniskaart)

    kenniskaarten_exact.extend(kenniskaarten_inclusief)

    return jsonify(kenniskaarten_exact), 200


@app.route('/api/ophalen/filteraantallen')
def vraag_filter_aantallen():
    filtersRol = [rol[0] for rol in Rol.query.with_entities(Rol.rolnaam).distinct()]
    filtersCategorie = [categorie[0] for categorie in Competentie.query.with_entities(Competentie.categorie).distinct()]
    filtersCompetenie = [competentie[0] for competentie in Competentie.query.with_entities(Competentie.competentie).distinct()]
    filtersArchitectuurlaag = [architectuurlaag[0] for architectuurlaag in Hboi.query.with_entities(Hboi.architectuurlaag).distinct()]
    filtersFase = [fase[0] for fase in Hboi.query.with_entities(Hboi.fase).distinct()]
    filtersNiveau = [niveau[0] for niveau in Hboi.query.with_entities(Hboi.niveau).distinct()]

    filteraantallen = {}
    for filter in filtersRol:
        filteraantallen.update({filter: Rol.query.filter_by(rolnaam=filter).count()})
    for filter in filtersCategorie:
        filteraantallen.update({filter: Competentie.query.filter_by(categorie=filter).count()})
    for filter in filtersCompetenie:
        filteraantallen.update({filter: Competentie.query.filter_by(competentie=filter).count()})
    for filter in filtersArchitectuurlaag:
        filteraantallen.update({filter: Hboi.query.filter_by(architectuurlaag=filter).count()})
    for filter in filtersFase:
        filteraantallen.update({filter: Hboi.query.filter_by(fase=filter).count()})
    for filter in filtersNiveau:
        filteraantallen.update({str(filter): Hboi.query.filter_by(niveau=filter).count()})

    return jsonify(filteraantallen), 200


@app.route('/api/wijzigen/kenniskaart/<kenniskaart_id>', methods=['PATCH'])
def wijzig_kenniskaart(kenniskaart_id):
    data = request.json

    Kenniskaart.query.filter_by(id=kenniskaart_id).update(dict(
        titel=data['titel'],
        auteur=data['auteur'],
        what=data['what'],
        why=data['why'],
        how=data['how'],
        voorbeeld=data['voorbeeld'],
        bronnen=data['bronnen'],
    ))

    rollen_huidig = Rol.query.with_entities(Rol.rolnaam).filter_by(kenniskaart_id=kenniskaart_id).all()
    for rol in rollen_huidig:
        if rol[0] not in data['rollen']:
            Rol.query.filter_by(kenniskaart_id=kenniskaart_id, rolnaam=rol[0]).delete()
    for rol in data['rollen']:
        if Rol.query.filter_by(kenniskaart_id=kenniskaart_id, rolnaam=rol).count() == 0:
            db.session.add(Rol(kenniskaart_id=kenniskaart_id, rolnaam=rol))

    competenties_huidig = Competentie.query.with_entities(Competentie.categorie, Competentie.competentie).filter_by(kenniskaart_id=kenniskaart_id).all()
    for competentie in competenties_huidig:
        if dict(zip(['categorie', 'competentie'], competentie)) not in data['competenties']:
            Competentie.query.filter_by(kenniskaart_id=kenniskaart_id, categorie=competentie[0], competentie=competentie[1]).delete()
    for competentie in data['competenties']:
        if Competentie.query.filter_by(kenniskaart_id=kenniskaart_id, categorie=competentie['categorie'], competentie=competentie['competentie']).count() == 0:
            competentie_nieuw = Competentie(kenniskaart_id=kenniskaart_id, categorie=competentie['categorie'], competentie=competentie['competentie'])
            db.session.add(competentie_nieuw)

    hboi_huidig = Hboi.query.with_entities(Hboi.architectuurlaag, Hboi.fase, Hboi.niveau).filter_by(kenniskaart_id=kenniskaart_id).all()
    for hboi in hboi_huidig:
        if dict(zip(['architectuurlaag', 'fase', 'niveau'], hboi)) not in data['hboi']:
            Hboi.query.filter_by(kenniskaart_id=kenniskaart_id, architectuurlaag=hboi[0], fase=hboi[1], niveau=hboi[2]).delete()
    for hboi in data['hboi']:
        if Hboi.query.filter_by(kenniskaart_id=kenniskaart_id, architectuurlaag=hboi['architectuurlaag'], fase=hboi['fase'], niveau=hboi['niveau']).count() == 0:
            hboi_nieuw = Hboi(kenniskaart_id=kenniskaart_id, architectuurlaag=hboi['architectuurlaag'], fase=hboi['fase'], niveau=hboi['niveau'])
            db.session.add(hboi_nieuw)

    db.session.commit()
    return jsonify({'succes': True}), 200


@app.route('/api/verwijderen/kenniskaart/<kenniskaart_id>', methods=['DELETE'])
def verwijder_kenniskaart(kenniskaart_id):
    Rol.query.filter_by(kenniskaart_id=kenniskaart_id).delete()
    Competentie.query.filter_by(kenniskaart_id=kenniskaart_id).delete()
    Hboi.query.filter_by(kenniskaart_id=kenniskaart_id).delete()
    Kenniskaart.query.filter_by(id=kenniskaart_id).delete()
    db.session.commit()
    return jsonify({'success': True}), 200
