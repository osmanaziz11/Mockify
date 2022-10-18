
from flask import Flask,jsonify,request
from flask_cors import CORS

import Boards.Indeed.all_jobs as Jobs
import Boards.Indeed.specific_job as singleJob

app = Flask(__name__)
CORS(app)

# ==================
# Routes
# Extract All Jobs relevant to the slug
@app.route('/api/jobs/<topic>/<location>',methods=['GET'])
def extractJobs(topic,location):
    resp=Jobs.Main(topic,location)
    if resp != 0:
        return jsonify({"status":1,"Jobs":resp})
    else:
        return jsonify({"status": 0})

@app.route('/api/job',methods=['POST'])
def extractSingleJob():
    resp=singleJob.Main(request.json['url'])
    if resp != 0:
        return jsonify({"status":1,"Desc":resp})
    else:
        return jsonify({"status": 0})

app.run(debug=True)