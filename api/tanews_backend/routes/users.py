from flask import Blueprint, jsonify, request
from db_connection import db


users = Blueprint('users', __name__)


# basic GET command to see all users
@users.route('/', methods=['GET'])
def get_users():
    cursor = db.get_db().cursor()
    cursor.execute("SELECT * FROM users ORDER BY name DESC")
    users = cursor.fetchall()
    cursor.close()
    return jsonify({'users': users})


# get command to get a user by ID


# get command to get a user by name


# POST command to create a user

