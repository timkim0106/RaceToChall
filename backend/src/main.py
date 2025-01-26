from flask import Flask
from flask_cors import CORS
from auth import auth_routes
from create_race import race_routes
from joincode import join_routes  # Import the join_routes blueprint
from database import init_db

def create_app():
    app = Flask(__name__)
    
    # Configure CORS to allow your frontend's origin
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

    # Initialize the database
    init_db()

    # Register Blueprints
    app.register_blueprint(auth_routes, url_prefix="/api/auth")
    app.register_blueprint(race_routes, url_prefix="/api/race")
    app.register_blueprint(join_routes, url_prefix="/api/join")  # Register the join_routes blueprint

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)