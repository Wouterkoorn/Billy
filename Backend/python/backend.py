from flask import Flask, request, jsonify
from flask_cors import CORS
import db

app = Flask(__name__)
CORS(app)

@app.route('/toevoegen', methods=['POST'])
def voeg_kenniskaart_toe():
    """"Voegt kenniskaart toe in de database"""
    data = request.json
    sql = "INSERT INTO kenniskaarten(titel, what, why, how, voorbeeld, rol, vaardigheid, hboi) VALUES ('{}','{}','{}','{}','{}','{}','{}','{}')".format(data['titel'], data['what'], data['why'], data['how'], data['voorbeeld'], data['rol'], data['vaardigheid'], data['hboi'])
    db.execute_sql(sql)
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}

def check_input():
    """Voorkomt sql injection"""
    pass

@app.route('/ophalen', methods=['GET'])
def vraag_kenniskaart_op():
    """Returnd alle velden van kenniskaart waaronder What Why How"""
    billydb = db.execute_sql('SELECT * FROM kenniskaarten')

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
             'hboi': kenniskaart['hboi']
             })
    return jsonify(kenniskaarten), 200, {'ContentType': 'application/json'}

app.run(host='0.0.0.0')  # run host op LAN
