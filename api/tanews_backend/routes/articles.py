from flask import Blueprint, jsonify, request
from db_connection import db


articles = Blueprint('articles', __name__)



# gets all articles in the database. 
@articles.route('/', methods=['GET'])
def get_articles():
    cursor = db.get_db().cursor()
    cursor.execute("SELECT * FROM articles ORDER BY publish_date DESC")
    articles = cursor.fetchall()
    cursor.close()
    return jsonify({'articles': articles})


@articles.route('/', methods=['POST'])
def add_article():
    try: 
        data = request.get_json()
        
        
        # current state of the schema, these are the required feilds. 
        #required_fields = ['text', 'title', 'read_time', 'publish_date']
        
        title = data.get('title')
        text = data.get('text')
        read_time = data.get('read_time')
        publish_date = data.get('publish_date')
        
        if not all([title, text, read_time, publish_date]):# if any required feilds are null
            return jsonify({'error': 'Missing required fields'}), 400
            
        cursor = db.get_db().cursor()
        query = "INSERT INTO articles (title, text, read_time, publish_date) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (title, text, read_time, publish_date))
        db.get_db().commit()
        
        new_article_id = cursor.lastrowid
        cursor.close()
        return jsonify({'message': 'Article added successfully', 'article_id': new_article_id}), 201

    except Exception as e: 
        return jsonify({'error': str(e)}), 500