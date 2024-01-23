from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///othello.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

@app.route("/")
def index():
    return ""
@app.route("/login")
def login():
    return "LOGIN"


if __name__ == "__main__":
    app.run(debug=True, port=4000)
