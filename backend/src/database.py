import os
import sqlite3

# Define the database path relative to the backend directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # Goes one level up to backend
DB_NAME = os.path.join(BASE_DIR, "racetochal.db")

def init_db():
    """Initialize the SQLite database with required tables."""
    print(f"Database path: {DB_NAME}")  # Confirm the path
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    # Create Users table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );
    ''')
    
    # Create Races table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Races (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        race_name TEXT NOT NULL,
        created_by INTEGER NOT NULL,
        FOREIGN KEY (created_by) REFERENCES Users(id)
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
    print(f"Database initialized and saved as {DB_NAME}.")

def connect_db():
    """Create a connection to the database."""
    return sqlite3.connect(DB_NAME)
