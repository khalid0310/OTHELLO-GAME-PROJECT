from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///othello.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Define models
class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    logins = db.relationship('Login', backref=db.backref('player', lazy=True))

    def __repr__(self):
        return f"<Player {self.id}: {self.name}>"

class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_played = db.Column(db.DateTime, nullable=False)
    result = db.Column(db.String(10), nullable=False)
    player_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)
    player = db.relationship('Player', backref=db.backref('games', lazy=True))

    def __repr__(self):
        return f"<Game {self.id}: {self.date_played} - {self.result}>"

class Login(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer, default=0)
    player_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)

    def __repr__(self):
        return f"<Login {self.id}: {self.username} - Score: {self.score}>"

@app.route("/")
def index():
    # Example: Retrieve all players and games from the database
    players = Player.query.all()
    games = Game.query.all()
    return render_template("index.html", players=players, games=games)

@app.route("/login")
def login():
    return "LOGIN"

if __name__ == "__main__":
    app.run(debug=True, port=4000)
