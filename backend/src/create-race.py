from flask import Flask, request, jsonify
from database import connect_db, init_db

def push_race(title,description,raceType, startDate, endDate, inviteCode):
    conn = connect_db()
    cursor = conn.cursor()


