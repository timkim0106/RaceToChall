import cassiopeia as cass
from flask import Flask, request, jsonify

app = Flask(__name__)
# Set Riot API key
cass.set_riot_api_key("YOUR_RIOT_API_KEY")
# Mock leaderboard storage
leaderboard = []


@app.route('/add_summoner', methods=['POST'])
def add_summoner():
    data = request.json
    game_name = data.get("game_name")
    tagline = data.get("tagline")
    region = data.get("region", "NA")

    try:
        # Fetch account and summoner details
        account = cass.get_account(name=game_name, tagline=tagline, region=region)
        summoner = account.summoner

        # Check ranked solo queue data
        rank_entry = next(
            (entry for entry in summoner.league_entries if entry.queue == cass.Queue.ranked_solo_fives),
            None
        )

        if rank_entry:
            player_data = {
                "game_name": account.name,
                "tagline": tagline,  # Fix here
                "region": region,
                "tier": rank_entry.tier.name,
                "division": rank_entry.division.name,
                "lp": rank_entry.league_points
            }
            leaderboard.append(player_data)
            return jsonify({"message": "Summoner added successfully", "data": player_data}), 201
        else:
            return jsonify({"error": "Summoner has no ranked data"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    try:
        # Define tier and division order for correct sorting
        tier_order = {
            "iron": 1, "bronze": 2, "silver": 3, "gold": 4,
            "platinum": 5, "diamond": 6, "master": 7,
            "grandmaster": 8, "challenger": 9
        }
        division_order = {
            "four": 4, "three": 3, "two": 2, "one": 1
        }

        # Sort leaderboard by tier, division, and LP
        sorted_leaderboard = sorted(
            leaderboard,
            key=lambda x: (
                tier_order.get(x["tier"].lower(), 0),  # Get tier rank
                division_order.get(x["division"].lower(), 0),  # Get division rank
                x["lp"]  # Sort by LP within the same tier/division
            ),
            reverse=True  # Higher tiers and LP first
        )
        return jsonify(sorted_leaderboard)
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/update_summoner', methods=['PUT'])
def update_summoner():
    data = request.json
    game_name = data.get("game_name")
    tagline = data.get("tagline")
    region = data.get("region", "NA")

    try:
        account = cass.get_account(name=game_name, tagline=tagline, region=region)
        summoner = account.summoner
        rank_entry = next(
            (entry for entry in summoner.league_entries if entry.queue == cass.Queue.ranked_solo_fives),
            None
        )

        if rank_entry:
            for player in leaderboard:
                if player["game_name"] == account.name and player["tagline"] == account.tag and player["region"] == region:
                    player["tier"] = rank_entry.tier.name
                    player["division"] = rank_entry.division.name
                    player["lp"] = rank_entry.league_points
                    return jsonify({"message": "Summoner updated successfully", "data": player}), 200

            return jsonify({"error": "Summoner not found in leaderboard"}), 404
        else:
            return jsonify({"error": "Summoner has no ranked data"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
