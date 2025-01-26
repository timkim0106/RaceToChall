from flask import request, jsonify, Blueprint
from flask_cors import CORS
import cassiopeia as cass
from database import connect_db, init_db  # Import init_db function

# Create a Blueprint for authentication
auth_routes = Blueprint("auth", __name__)
CORS(auth_routes)  # Enable CORS for this blueprint

# Set up Riot API key for Cassiopeia
cass.set_riot_api_key("RGAPI-d7e6ead7-a997-4734-9033-69bb09a5935b")  # Replace with your Riot API key

@auth_routes.route('/register', methods=['POST'])
def register_user():
    conn = None
    try:
        # Extract data from the request
        data = request.json
        username = data.get('username')
        password = data.get('password')
        ign = data.get('ign')

        # Validate input
        if not username or not password or not ign:
            return jsonify({'error': 'Username, password, and IGN are required'}), 400

        # Validate IGN format
        try:
            name, tagline = ign.split("#")
        except ValueError:
            return jsonify({'error': "Invalid IGN format. Use 'SummonerName#Tagline'"}), 400

        # Fetch ranked data from Riot API
        try:
            account = cass.Account(name=name, tagline=tagline, region="NA")
            summoner = account.summoner
            rank_info = summoner.league_entries.fives

            if rank_info:
                tier = rank_info.tier.value  # e.g., "GOLD"
                division = rank_info.division.value  # e.g., "I"
                lp = rank_info.league_points  # League Points
            else:
                tier, division, lp = "UNRANKED", "", 0
        except Exception as e:
            return jsonify({'error': f"Failed to fetch rank for IGN {ign}. Error: {str(e)}"}), 500

        # Save user and rank information to the database
        conn = connect_db()
        cursor = conn.cursor()

        # Check if the username already exists
        cursor.execute("SELECT * FROM Users WHERE username = ?", (username,))
        if cursor.fetchone():
            return jsonify({'error': 'Username already exists'}), 409

        # Insert new user
        cursor.execute(
            """
            INSERT INTO Users (username, password, ign, tier, division, lp)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (username, password, ign, tier, division, lp)
        )
        conn.commit()

        return jsonify({'message': 'User registered successfully', 'tier': tier, 'division': division, 'lp': lp}), 201

    except Exception as e:
        return jsonify({'error': f"An unexpected error occurred: {str(e)}"}), 500
    finally:
        if conn:
            conn.close()

@auth_routes.route('/login', methods=['POST'])
def login_user():
    conn = None
    try:
        # Extract data from the request
        data = request.json
        username = data.get('username')
        password = data.get('password')

        # Validate input
        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400

        # Check user credentials in the database
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Users WHERE username = ? AND password = ?", (username, password))
        user = cursor.fetchone()

        if user:
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401

    except Exception as e:
        return jsonify({'error': f"An unexpected error occurred: {str(e)}"}), 500
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    init_db()