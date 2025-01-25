from database import init_db, connect_db

def test_database():
    # Initialize the database
    print("Initializing database...")
    init_db()

    # Connect to the database
    conn = connect_db()
    cursor = conn.cursor()

    try:
        # Insert a test user
        print("Inserting a test user...")
        cursor.execute("INSERT INTO Users (username, password) VALUES (?, ?);", ("test_user", "password123"))
        conn.commit()

        # Query the test user
        print("Querying the test user...")
        cursor.execute("SELECT * FROM Users WHERE username = ?;", ("test_user",))
        user = cursor.fetchone()
        print("User fetched from the database:", user)

        # Clean up (delete the test user)
        print("Cleaning up...")
        cursor.execute("DELETE FROM Users WHERE username = ?;", ("test_user",))
        conn.commit()

    except Exception as e:
        print("An error occurred:", e)

    finally:
        conn.close()
        print("Database connection closed.")

if __name__ == "__main__":
    test_database()
