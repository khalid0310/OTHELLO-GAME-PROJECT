# seeds.py
from app import app, db
from models import User, Move, PlayerScore

with app.app_context():
    # Seed Users
    user1 = User(username="john_doe", email="john@example.com")
    user1.set_password("password123")

    user2 = User(username="jane_doe", email="jane@example.com")
    user2.set_password("securepassword")

    # Seed Moves
    move1 = Move(move_number=1, move_description="Initial move", user=user1)
    move2 = Move(move_number=2, move_description="Second move", user=user1)

    move3 = Move(move_number=1, move_description="First move", user=user2)
    move4 = Move(move_number=2, move_description="Another move", user=user2)

    # Seed PlayerScores
    score1 = PlayerScore(score=100, user=user1)
    score2 = PlayerScore(score=75, user=user2)

    # Add and commit the changes to the database
    db.session.add_all([user1, user2, move1, move2, move3, move4, score1, score2])
    db.session.commit()

    print("Database seeded successfully!")
