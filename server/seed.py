from datetime import datetime
from flask import Flask
from models import db, Player, Game, Login

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///othello.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    # Create the database tables
    db.create_all()

    # Add seed data
    player1 = Player(name="amar")
    player2 = Player(name="john")

    db.session.add(player1)
    db.session.add(player2)
    db.session.commit()

    game1 = Game(date_played=datetime.now(), result="Win", player=player1)
    game2 = Game(date_played=datetime.now(), result="Loss", player=player2)

    db.session.add(game1)
    db.session.add(game2)
    db.session.commit()

    login1 = Login(username="Amar", password="password123", score=100, player=player1)
    login2 = Login(username="john", password="securepassword", score=80, player=player2)

    db.session.add(login1)
    db.session.add(login2)
    db.session.commit()

    print("Database seeded successfully.")
