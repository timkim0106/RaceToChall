import cassiopeia as cass
import config
from flask import Flask, request, jsonify

app = Flask(__name__)

# Mock leaderboard storage
leaderboard = []

# Add a summoner to the leaderboard
@app.route('/add_summoner', methods=['POST'])
def add_summoner():
    data = request.json
    summoner_name = data.get("summoner_name")
    region = data.get("region", "NA")

    try:
        summoner = cass.get_summoner(name=summoner_name, region=region)
        rank_info = summoner.league_entries[0]  # Get rank info from the first queue (e.g., Solo/Duo)

        # Add player details to the leaderboard
        player_data = {
            "summoner_name": summoner.name,
            "region": region,
            "tier": rank_info.tier.value,
            "rank": rank_info.division.value,
            "lp": rank_info.league_points
        }
        leaderboard.append(player_data)
        return jsonify({"message": "Summoner added successfully", "data": player_data}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Get the leaderboard
@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    sorted_leaderboard = sorted(leaderboard, key=lambda x: (-x['tier'], -x['lp']))
    return jsonify(sorted_leaderboard)

# Update summoner LP and rank
@app.route('/update_summoner', methods=['PUT'])
def update_summoner():
    data = request.json
    summoner_name = data.get("summoner_name")
    region = data.get("region", "NA")

    try:
        summoner = cass.get_summoner(name=summoner_name, region=region)
        rank_info = summoner.league_entries[0]

        for player in leaderboard:
            if player["summoner_name"] == summoner_name and player["region"] == region:
                player["tier"] = rank_info.tier.value
                player["rank"] = rank_info.division.value
                player["lp"] = rank_info.league_points
                return jsonify({"message": "Summoner updated successfully", "data": player}), 200

        return jsonify({"error": "Summoner not found in leaderboard"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)

