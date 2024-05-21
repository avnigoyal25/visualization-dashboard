
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object('config.Config')
mongo = PyMongo(app)
CORS(app)

@app.route('/api/samples', methods=['GET'])
def get_samples():
    samples = mongo.db.sample.find()
    data = []
    for sample in samples:
        sample['_id'] = str(sample['_id'])
        data.append(sample)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
