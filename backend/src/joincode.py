from flask import Flask, request, jsonify
from database import connect_db, init_db
import random
import string

def generate_code():
    conn = connect_db()
    cursor = conn.cursor()
    print("generating a code token ...")
    
    token_length = 10
    token = ''.join(random.choices(string.ascii_letters + string.digits, k=token_length))

    cursor.execute("SELECT COUNT(*) FROM tokens WHERE token = %s", (token,))
    result = cursor.fetchone()
    
    while result[0] > 0:
        token = ''.join(random.choices(string.ascii_letters + string.digits, k=token_length))
        cursor.execute("SELECT COUNT(*) FROM tokens WHERE token = %s", (token,))
        result = cursor.fetchone()
        
    print(f"Generated token: {token}")
