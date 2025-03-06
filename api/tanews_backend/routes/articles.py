from flask import Blueprint, jsonify, request
from db_connection import db


articles = Blueprint('articles', __name__)



# gets all articles in the database. 
@articles.route('/', methods=['GET'])
def get_articles():
    cursor = db.get_db().cursor()
    query = """
            SELECT
            a.article_id,
            a.title,
            a.text,
            a.read_time,
            a.publish_date,
            u.user_id,
            u.name AS author_name,
            c.name AS category
        FROM TaNewsDB.articles a
        JOIN TaNewsDB.article_authors aa ON a.article_id = aa.article_id
        JOIN TaNewsDB.users u ON aa.user_id = u.user_id
        JOIN TaNewsDB.article_category ac ON a.article_id = ac.article_id
        JOIN TaNewsDB.categories c ON ac.category_id = c.category_id;


        """
    cursor.execute(query)
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