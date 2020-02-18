from flask import Flask, request, jsonify
import db

app = Flask(__name__)

#testen van toevoegen

@app.route('/toevoegen', methods=['POST'])
def voeg_kennisbron_toe():
    data = request.json
    db.execute_sql(f"INSERT INTO kennisbron(what, why, how) VALUES ('{data['what']}','{data['why']}','{data['how']}')")
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}

@app.route('/ophalen', methods=['GET'])
def vraag_kennisbron_op():
    billydb = db.execute_sql('SELECT * FROM kennisbron')


    kennisbronnen = []
    for x in billydb:
        kennisbronnen.append(
                {'what':x['what'], 'why':x['why'], 'how':x['how']})

    return jsonify(kennisbronnen), 200, {'ContentType': 'application/json'}
    
app.run(host='0.0.0.0')