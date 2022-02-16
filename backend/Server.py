from flask import Flask, render_template
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder="../reactapp/build/static", template_folder="../reactapp/build")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
@cross_origin()
def hello():
    return render_template('index.html')


@app.route("/data")
@cross_origin()
def data():
    return {"Labels": [
        "L1",
        "L2",
        "L3",
        "L4",
        "L5",
        ]}

if __name__ == "__main__":
    app.run(debug=True)