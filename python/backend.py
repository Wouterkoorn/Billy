from flask import Flask, request, jsonify
from flask_cors import CORS
import db

app = Flask(__name__)
CORS(app)


@app.route('/toevoegen', methods=['POST'])
def voeg_kennisbron_toe():
    """"Voegt kennisbron toe in de database"""
    data = request.json
    print(data)
    #Makkelijk om te editen, verander als je wilt
    db.execute_sql(f"""INSERT INTO kennisbron(what, why, how, voorbeeld, 1, 2, 3, 4, 5) 
                     VALUES 
                     {data['what']},
                     {data['why']}, 
                     {data['how']}, 
                     {data['voorbeeld']},
                     {data['1']},
                     {data['2']},
                     {data['3']},
                     {data['4']},
                     {data['5']}""")
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}

def check_input():
    pass

@app.route('/ophalen', methods=['GET'])
def vraag_kennisbron_op():
    """Returnd alle velden van kennisbron waaronder What Why How"""
    billydb = db.execute_sql('SELECT * FROM kennisbron')

    kennisbronnen = []
    for kennisbron in billydb:
        kennisbronnen.append(
                {'what':kennisbron['what'],
                 'why':kennisbron['why'],
                 'how':kennisbron['how'],
                 'voorbeeld':kennisbron['voorbeeld'],
                 # '': kennisbron[''],
                 # '': kennisbron[''],
                 # '': kennisbron[''],
                 # '': kennisbron[''],
                 # '': kennisbron['']
                 })
    return jsonify(kennisbronnen), 200, {'ContentType': 'application/json'}

app.run(host='0.0.0.0') #run host op LAN