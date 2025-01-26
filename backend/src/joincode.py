from flask import Flask, request, jsonify, Blueprint
from database import connect_db, init_db

app = Flask(__name__)

join_routes = Blueprint("join", __name__)

@join_routes.route('/join-race', methods=['POST'])
def join_race():
    try:
        data = request.get_json()
        username = data.get('username')
        join_code = data.get('joinCode')

        if not username or not join_code:
            return jsonify({"error": "Username and join code are required"}), 400

        # Connect to the database
        with connect_db() as conn:
            cursor = conn.cursor()

            # Check if the join code exists
            cursor.execute("SELECT id FROM Races WHERE token_key = ?", (join_code,))
            race = cursor.fetchone()
            if not race:
                return jsonify({"error": "Invalid join code"}), 400

            race_id = race[0]

            # Check if the user exists
            cursor.execute("SELECT id FROM Users WHERE username = ?", (username,))
            user = cursor.fetchone()
            if not user:
                return jsonify({"error": "User not found"}), 400

            user_id = user[0]

            # Add the user to the race
            cursor.execute("INSERT INTO Participants (race_id, user_id) VALUES (?, ?)", (race_id, user_id))
            conn.commit()

        return jsonify({"message": "Successfully joined the race"}), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Register Blueprint
app.register_blueprint(join_routes, url_prefix='/api/join')

if __name__ == '__main__':
    # Initialize the database
    init_db()
    app.run(debug=True)