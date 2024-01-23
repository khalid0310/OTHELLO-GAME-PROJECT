# app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, User, Move, PlayerScore

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///othello.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
migrate = Migrate(app, db)

# Your routes and other configurations go here
# For example:


@app.route("/")
def home():
    return "Hello, Flask app with database!"


# Route for user signup
@app.route("/signup", methods=["POST"])
def signup():
    if request.method == "POST":
        data = request.json  # Assuming JSON data is sent in the request

        # Extract data from the request
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        # Check if the username or email already exists in the database
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

        # Create a new user instance
        new_user = User(username=username, email=email)
        new_user.set_password(password)

        # Add the new user to the database
        db.session.add(new_user)
        db.session.commit()

        return (
            jsonify({"message": "User registered successfully!"}),
            201,
        )  # 201 Created status code


# Route for user login
@app.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        data = request.json  # Assuming JSON data is sent in the request

        # Extract data from the request
        username = data.get("username")
        password = data.get("password")

        # Check if the user exists in the database
        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            return jsonify({"message": "Login successful!"}), 200  # 200 OK status code
        else:
            return (
                jsonify({"message": "Invalid username or password."}),
                401,
            )  # 401 Unauthorized status code


@app.route("/update_user/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    if request.method == "PUT":
        data = request.json  # Assuming JSON data is sent in the request

        # Extract data from the request
        new_username = data.get("new_username")
        new_password = data.get("new_password")

        # Find the user in the database
        user = User.query.get(user_id)

        if not user:
            return (
                jsonify({"message": "User not found"}),
                404,
            )  # 404 Not Found status code

        # Update the user's information
        if new_username:
            user.username = new_username
        if new_password:
            user.set_password(new_password)

        # Commit the changes to the database
        db.session.commit()

        return (
            jsonify({"message": "User information updated successfully"}),
            200,
        )  # 200 OK status code


# Route for deleting a user record
@app.route("/delete_user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    if request.method == "DELETE":
        # Find the user in the database
        user = User.query.get(user_id)

        if not user:
            return (
                jsonify({"message": "User not found"}),
                404,
            )  # 404 Not Found status code

        # Delete the user from the database
        db.session.delete(user)
        db.session.commit()

        return (
            jsonify({"message": "User deleted successfully"}),
            200,
        )  # 200 OK status code


if __name__ == "__main__":
    app.run(port=4000, debug=True)
