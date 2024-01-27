import logging
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User
from othello_game import OthelloGame

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///othello.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

db.init_app(app)
migrate = Migrate(app, db)

# Create an instance of OthelloGame
othello_game = OthelloGame()


# Home route
@app.route("/")
def home():
    return "Hello, Flask app with database!"


# Route for user signup
@app.route("/signup", methods=["POST"])
def signup():
    if request.method == "POST":
        data = request.json

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        existing_user = (
            User.query.filter_by(username=username).first()
            or User.query.filter_by(email=email).first()
        )

        if existing_user:
            return (
                jsonify(
                    {
                        "message": "Username or email already exists. Please choose another."
                    }
                ),
                400,
            )

        new_user = User(username=username, email=email)
        new_user.set_password(password)

        db.session.add(new_user)
        db.session.commit()

        return (
            jsonify({"message": "User registered successfully!"}),
            201,
        )


# Route for user login
@app.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        data = request.json

        username = data.get("username")
        password = data.get("password")

        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            return jsonify({"message": "Login successful!"}), 200
        else:
            return (
                jsonify({"message": "Invalid username or password."}),
                401,
            )


# Route for updating user information
@app.route("/update_user/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    if request.method == "PUT":
        data = request.json

        new_username = data.get("new_username")
        new_password = data.get("new_password")

        user = User.query.get(user_id)

        if not user:
            return (
                jsonify({"message": "User not found"}),
                404,
            )

        if new_username:
            user.username = new_username
        if new_password:
            user.set_password(new_password)

        db.session.commit()

        return (
            jsonify({"message": "User information updated successfully"}),
            200,
        )


# Route for deleting a user record
@app.route("/delete_user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    if request.method == "DELETE":
        user = User.query.get(user_id)

        if not user:
            return (
                jsonify({"message": "User not found"}),
                404,
            )

        db.session.delete(user)
        db.session.commit()

        return (
            jsonify({"message": "User deleted successfully"}),
            200,
        )


# New route for making a move in the Othello game
@app.route("/othello/make_move", methods=["POST"])
def make_move():
    if request.method == "POST":
        data = request.json
        row = data.get("row")
        col = data.get("col")

        result = othello_game.make_move(row, col)

        logger.info("Move result: %s", result)
        return jsonify(result)


# New route for getting the current state of the Othello game board
@app.route("/get_board", methods=["GET"])
def get_board():
    if request.method == "GET":
        board = othello_game.get_board()
        return jsonify({"board": board})


# New route for checking if the Othello game is over
@app.route("/is_game_over", methods=["GET"])
def is_game_over():
    if request.method == "GET":
        game_over = othello_game.is_game_over()
        return jsonify({"game_over": game_over})


# New route for resetting the Othello game
@app.route("/reset_game", methods=["POST"])
def reset_game():
    if request.method == "POST":
        othello_game.reset_game()
        return jsonify({"message": "Othello game reset successfully"})


if __name__ == "__main__":
    app.run(port=4000, debug=True)
