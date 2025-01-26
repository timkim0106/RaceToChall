from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
import sqlite3
import os
from database import init_db, connect_db

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Define the database path
DATABASE_PATH = os.path.join(os.path.dirname(__file__), "racetochal.db")

# Create a Blueprint for race management
race_routes = Blueprint("race", __name__)

@race_routes.route('/create-race', methods=['POST'])
def create_race():
    try:
        data = request.get_json()
        title = data.get('title')
        description = data.get('description', '')  # Optional
        race_type = data.get('raceType')
        start_date = data.get('startDate')
        end_date = data.get('endDate')
        invite_code = data.get('inviteCode')

        # Validate fields
        if not all([title, race_type, start_date, end_date, invite_code]):
            return jsonify({"error": "Missing required fields"}), 400

        # Connect to the database
        with connect_db() as conn:
            cursor = conn.cursor()

            # Insert race data
            cursor.execute("""
                INSERT INTO Races (race_name, description, race_type, start_date, end_date, token_key)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (title, description, race_type, start_date, end_date, invite_code))
            conn.commit()
            race_id = cursor.lastrowid

        return jsonify({"message": "Race created successfully", "raceId": race_id}), 201

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@race_routes.route('/top-races', methods=['GET'])
def get_top_races():
    try:
        # Connect to the database
        with connect_db() as conn:
            cursor = conn.cursor()

            # Fetch the top races ordered by the time they were added
            cursor.execute("""
                SELECT id, race_name FROM Races ORDER BY id DESC LIMIT 3
            """)
            races = cursor.fetchall()

        return jsonify([{"id": race[0], "title": race[1]} for race in races]), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@race_routes.route('/user-races/<username>', methods=['GET'])
def get_user_races(username):
    try:
        # Connect to the database
        with connect_db() as conn:
            cursor = conn.cursor()

            # Fetch the races for the given user
            cursor.execute("""
                SELECT Races.id, Races.race_name
                FROM Races
                JOIN Participants ON Races.id = Participants.race_id
                JOIN Users ON Participants.user_id = Users.id
                WHERE Users.username = ?
            """, (username,))
            races = cursor.fetchall()

        return jsonify([{"id": race[0], "title": race[1]} for race in races]), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@race_routes.route('/leaderboard/<int:race_id>', methods=['GET'])
def get_leaderboard(race_id):
    try:
        # Connect to the database
        with connect_db() as conn:
            cursor = conn.cursor()

            # Fetch the leaderboard for the given race
            cursor.execute("""
                SELECT Users.username, Users.tier, Users.division, Users.lp
                FROM Participants
                JOIN Users ON Participants.user_id = Users.id
                WHERE Participants.race_id = ?
                ORDER BY Users.lp DESC
            """, (race_id,))
            leaderboard = cursor.fetchall()

        return jsonify([{"username": user[0], "tier": user[1], "division": user[2], "lp": user[3]} for user in leaderboard]), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Register Blueprint
app.register_blueprint(race_routes, url_prefix='/api/race')

if __name__ == '__main__':
    # Initialize the database
    init_db()
    app.run(debug=True)