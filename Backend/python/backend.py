from flask import Flask, request, jsonify
from flask_cors import CORS
import db

app = Flask(__name__)
CORS(app)

def lijstmaken(billydb):
    kenniskaarten = []
    for kenniskaart in billydb:
        kenniskaarten.append(
            {'titel': kenniskaart['titel'],
             'what': kenniskaart['what'],
             'why': kenniskaart['why'],
             'how': kenniskaart['how'],
             'voorbeeld': kenniskaart['voorbeeld'],
             'rol': kenniskaart['rol'],
             'vaardigheid': kenniskaart['vaardigheid'],
             'hboi': kenniskaart['hboi'],
             'datetime': kenniskaart['datetime']
             }
        )
    return kenniskaarten


@app.route('/toevoegen', methods=['POST'])
def voeg_kenniskaart_toe():
    data = request.json
    sql = f"INSERT INTO kenniskaarten(titel, what, why, how, voorbeeld, rol, vaardigheid, hboi) VALUES ('{data['titel']}','{data['what']}','{data['why']}','{data['how']}','{data['voorbeeld']}','{data['rol']}','{data['vaardigheid']}','{data['hboi']}')"
    db.execute_sql(sql)
    return jsonify({'success': True}), 200


def check_input():
    """Voorkomt sql injection"""
    pass


@app.route('/ophalen', methods=['GET'])
def vraag_kenniskaart_op():
    billydb = db.execute_sql('SELECT * FROM kenniskaarten')
    return jsonify(lijstmaken(billydb)), 200


@app.route('/ophalen/<zoekvraag>', methods=['GET'])
def zoek_kenniskaart(zoekvraag):
    billydb = db.execute_sql('SELECT * FROM kenniskaarten')
    lijstkenniskaarten = lijstmaken(billydb)
    results, kenniskaartentitels = [], []

    for item in lijstkenniskaarten:

        titel = str(item['titel'])
        kenniskaartentitels.append(titel)

        def bestResult(resultSort):
            num = resultSort.lower().find(zoekvraag.lower())
            return num

        if zoekvraag.lower() in titel.lower():
            results.append(titel)
            print('1')

        elif titel.lower() in zoekvraag.lower():
            results.append(titel)
            print('2')

    if len(results) == 0:
        print('3')
        return 'Geen resultaten gevonden.'

    else:
        sorted(results, key=bestResult, reverse=False)

        kaarten = []

        for i in results:
            kaarten.append(lijstkenniskaarten[kenniskaartentitels.index(i)])

        print(results)

        print(len(kaarten))
        return jsonify(kaarten), 200


app.run(host='0.0.0.0', port='56743')  # run host op www

