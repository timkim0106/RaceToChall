from flask import Flask, request, jsonify
from database import connect_db, init_db
from joincode import generate_code

app = Flask(__name__)

# Example endpoint: Register User
@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400
    
    try:
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO Users (username, password) VALUES (?, ?)", (username, password))
        conn.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()
# Generate invite code
@app.route('/generate-invite-code', methods = ['GET'])
def generate_invite_code():
    code = jsonify({'inviteCode': generate_code()})
    print(code)
    return code
if __name__ == "__main__":
    init_db()  # Ensure the database is initialized
    app.run(debug=True)
