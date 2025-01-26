import sqlite3
import os

# Define the database path relative to the backend directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # Goes one level up to backend
DB_NAME = os.path.join(BASE_DIR, "racetochal.db")

def init_db():
    """Initialize the SQLite database with required tables."""
    print(f"Database path: {DB_NAME}")  # Confirm the path
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    # Create or update Users table with additional columns
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        ign TEXT,         -- In-Game Name
        tier TEXT,        -- Ranked Tier (e.g., Gold, Platinum)
        division TEXT,    -- Ranked Division (e.g., I, II, III)
        lp INTEGER        -- League Points
    );
    ''')

    # Create Races table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Races (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        race_name TEXT NOT NULL,          -- Race Title
        description TEXT,                 -- Description of the race
        race_type TEXT NOT NULL,          -- Type of race (e.g., "First to Challenger")
        start_date DATE NOT NULL,         -- Start Date
        end_date DATE NOT NULL,           -- End Date
        token_key TEXT NOT NULL UNIQUE    -- Invite Code (unique for each race)
    );
    ''')

    # Create Participants table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Participants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        race_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (race_id) REFERENCES Races(id),
        FOREIGN KEY (user_id) REFERENCES Users(id)
    );
    ''')

    conn.commit()
    conn.close()

def connect_db():
    """Connect to the SQLite database."""
    return sqlite3.connect(DB_NAME)

if __name__ == "__main__":
    init_db()