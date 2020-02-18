from flask import Flask, request, jsonify
from flask_cors import CORS
import db

app = Flask(__name__)
CORS(app)


@app.route('/toevoegen', methods=['POST'])
def voeg_kennisbron_toe():
    data = request.json
    print(data)
    db.execute_sql("INSERT INTO kennisbron(what, why, how) VALUES ('{}','{}','{}')".format(data['what'], data['why'], data['how']))
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}

def check_input():
    pass

@app.route('/ophalen', methods=['GET'])
def vraag_kennisbron_op():
    billydb = db.execute_sql('SELECT * FROM kennisbron')


    kennisbronnen = []
    for x in billydb:
        kennisbronnen.append(
                {'what':x['what'], 'why':x['why'], 'how':x['how']})

    return jsonify(kennisbronnen), 200, {'ContentType': 'application/json'}

app.run(host='0.0.0.0')
