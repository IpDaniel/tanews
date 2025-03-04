import re
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
    return jsonify({'users': users}), 200


# get command to get a user by ID
@users.route('/<int:id>', methods=['GET'])
def get_users_by_ID(id):
    cursor = db.get_db().cursor()
    cursor.execute("SELECT * FROM users WHERE user_id = %s ORDER BY name DESC", (id,)) # SQL Injection Safe way
    user = cursor.fetchall()
    cursor.close()
    return jsonify({'user': user}) if user else jsonify({'error': 'User not found'}), 404   



# POST command to create a user

'''
    user_id
    name 
    email 
    password 
    is_admin 
    is_author 
    image_url 
    created_at
    updated_at
'''

# ID, Created_at, update_at all get created automatically
@users.route('/', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        # validate that these are all correct data types
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        is_admin = bool(data.get('is_admin', False))
        is_author = bool(data.get('is_author', False))
        image_url = data.get('image_url', None)


        if not all([name, email, password]):# if any required fields are missing
            return jsonify({'error': 'Missing required fields'}), 400
        
        # validate email format 
        email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(email_regex, email):
            return jsonify({'error': 'Invalid email format'}), 400
        

        # make sure email is unique
        cursor = db.get_db().cursor()
        cursor.execute("SELECT COUNT(*) FROM users WHERE email = %s", (email,))
        (email_count,) = cursor.fetchone()
        if email_count > 0:
            cursor.close()
            return jsonify({'error': 'Email is already registered'}), 400
        

        # Insert into database
        query = """
            INSERT INTO users (name, email, password, is_admin, is_author, image_url)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (name, email, password, is_admin, is_author, image_url))
        db.get_db().commit()

        new_user_id = cursor.lastrowid
        cursor.close()

        return jsonify({'message': 'User created successfully', 'user_id': new_user_id}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500




    


