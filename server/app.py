from flask import Flask, render_template
from flask_migrate import Migrate
from models import db, Player, Game, Login

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///othello.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
migrate = Migrate(app, db)

@app.route("/")
def index():
    players = Player.query.all()
    games = Game.query.all()
    return render_template("index.html", players=players, games=games)

@app.route("/login")
def login():
    return "LOGIN"

if __name__ == "__main__":
    app.run(debug=True, port=4000)
