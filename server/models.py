from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    logins = db.relationship('Login', backref=db.backref('player', lazy=True))
    games = db.relationship('Game', backref=db.backref('player', lazy=True))

    def __repr__(self):
        return f"<Player {self.id}: {self.name}>"

class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_played = db.Column(db.DateTime, nullable=False)
    result = db.Column(db.String(10), nullable=False)
    player_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)

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
