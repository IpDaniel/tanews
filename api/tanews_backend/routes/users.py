import re
from flask import Blueprint, jsonify, request
from db_connection import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta

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
@users.route('/register', methods=['POST'])
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
        cursor.execute("SELECT COUNT(*) AS count FROM users WHERE email = %s", (email,))
        result = cursor.fetchone()  # This will be a dictionary like {'count': 1}
        email_count = result["count"]
        if int(email_count) > 0:
            cursor.close()
            return jsonify({'error': 'Email is already registered'}), 400
        


        # naman's change to aditya's route: addoing a password hash. found a simple library we can use to do this??? hopefullt it works???
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        # Insert into database
        query = """
            INSERT INTO users (name, email, password, is_admin, is_author, image_url)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        # we do NOT store blank passwords in the db. we hash it first. I changed the cursor.execute to include the hashed_password instead of just the password. 
        cursor.execute(query, (name, email, password, is_admin, is_author, image_url))
        db.get_db().commit()

        new_user_id = cursor.lastrowid
        cursor.close()

        return jsonify({'message': 'User created successfully', 'user_id': new_user_id}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500



# Login and generate JWT token
@users.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not all([email, password]):
            return jsonify({'error': 'Missing email or password'}), 400

        cursor = db.get_db().cursor()
        cursor.execute("SELECT user_id, name, password FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()

        if not user:
            return jsonify({'error': 'Invalid email or password'}), 401

        # Verify hashed password HASHING STUFF, WORRY ABOUT THIS LATER
        # if not check_password_hash(user['password'], password):
        #     return jsonify({'error': 'Invalid email or password'}), 401
        
        if password != user['password']: 
            return jsonify({'error': 'Invalid email or password'}), 401
            


         # DEBUG: Print identity to make sure it's correct
        print(f"DEBUG - JWT Identity: {user['user_id']} (Type: {type(user['user_id'])})")
        # Generate JWT token
        access_token = create_access_token(identity=str(user['user_id']), expires_delta=timedelta(hours=2))

        
        return jsonify({'message': 'Login successful', 'access_token': access_token}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500




# Example protected route
@users.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    user_id = get_jwt_identity()  # This is now a string (user_id)
    
    cursor = db.get_db().cursor()
    cursor.execute("SELECT name FROM users WHERE user_id = %s", (user_id,))
    user = cursor.fetchone()
    cursor.close()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({'message': f'Hello, {user["name"]}! You accessed a protected route.'}), 200


    


