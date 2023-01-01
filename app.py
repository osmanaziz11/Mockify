
from flask import Flask,jsonify,request
from flask_cors import CORS
import random as re

import Boards.Indeed.all_jobs as Jobs
import Boards.Indeed.specific_job as singleJob
import Boards.Mustaqbil.jobs as Mustaqbil
import Boards.Rozee.jobs as Rozee

import util.utilities as helper

app = Flask(__name__)
CORS(app)

# ==================
# Routes
# Indeed Route
@app.route('/api/indeed/jobs/<topic>/<location>',methods=['GET'])
def extractJobs(topic,location):
    resp=Jobs.Main(topic,location)
    if resp != 0:
        return jsonify({"status":1,"Jobs":resp})
    else:
        return jsonify({"status": 0})

# Extract Specific Job description relevant to the job id
@app.route('/api/job',methods=['POST'])
def extractSingleJob():
    resp=singleJob.Main(request.json['url'])
    if resp != 0:
        return jsonify({"status":1,"response":resp})
    else:
        return jsonify({"status": 0})

# Mustaqbil Route  
@app.route('/api/mustaqbil/jobs/',methods=['GET'])
def mustaqbilJob():
    resp=Mustaqbil.Jobs
    if resp != 0:
        re.shuffle(resp)
        return jsonify({"status":1,"Jobs":resp})
    else:
        return jsonify({"status": 0})

# Rozee Route
@app.route('/api/rozee/jobs/',methods=['GET'])
def rozeeJob():
    resp=Rozee.Jobs
    if resp != 0:
        re.shuffle(resp)
        return jsonify({"status":1,"Jobs":resp})
    else:
        return jsonify({"status": 0})

# Predict according to given job information from the user
@app.route('/api/predict',methods=['POST'])
def predict():
    predict=helper.Predict(request.json['data'])
    resp=predict.driver()
    if resp!= 0:
        return jsonify({"status":1,"response":resp})
    return jsonify({"status":0})

app.run(debug=True)