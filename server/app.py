from flask import Flask

app = Flask(__name__)


@app.route("/")
def index():
    return ""


@app.route("/login")
def login():
    return ""


if __name__ == "__main__":
    app.run(debug=True, port=3000)
