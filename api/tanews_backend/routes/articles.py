from flask import Blueprint, jsonify, request
from db_connection import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity



articles = Blueprint('articles', __name__)



# gets all articles in the database. 
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
            a.head_url, 
            a.publish_date,
            COALESCE(u.user_id, -1) AS user_id,
            COALESCE(u.name, 'No author set') AS author_name,
            COALESCE(c.name, 'No category set') AS category
        FROM TaNewsDB.articles a
        LEFT JOIN TaNewsDB.article_authors aa ON a.article_id = aa.article_id
        LEFT JOIN TaNewsDB.users u ON aa.user_id = u.user_id
        LEFT JOIN TaNewsDB.article_category ac ON a.article_id = ac.article_id
        LEFT JOIN TaNewsDB.categories c ON ac.category_id = c.category_id;
    """
    cursor.execute(query)
    articles = cursor.fetchall()
    cursor.close()
    return jsonify({'articles': articles})


# route to return all article categories
@articles.route('/categories', methods=['GET'])
def get_categories():
    cursor = db.get_db().cursor()
    query = 'SELECT name FROM TaNewsDB.categories ORDER BY name DESC'
    cursor.execute(query)
    categories = cursor.fetchall()
    cursor.close()
    return jsonify({'categories': categories})





# not secured yet. habe to add jwt_required() 
# ADITYA IS DOING THIS 
@articles.route('/', methods=['POST'])
@jwt_required()
def add_article(): # JSON object, title, headline, readtime, publish date, publish authors, categories, Head URL.; Make sure evrrythign is there
    try: 
        
        
        # have to add to authors table, categories table, and articles table. 
        user_id = get_jwt_identity()
        
        # have a check for if the person is an admin => 

        cursor = db.get_db().cursor()
        cursor.execute("SELECT is_admin FROM users WHERE user_id = %s", (user_id,))
        user = cursor.fetchone()

            # if fase return 500 status
        if not user or not user["is_admin"]:
            return jsonify({"error": "Unauthorized. Only admins can add articles."}), 500

        
        # if true
            # parse data from route. 
        
        data = request.get_json()

        title = data.get("title")
        headline = data.get("headline")
        read_time = data.get("read_time")
        publish_date = data.get("publish_date")
        authors = data.get("authors")  # List of author IDs
        categories = data.get("categories")  # List of category IDs
        head_url = data.get("head_url")
        text = data.get("text")
        
        
        # current state of the schema, these are the required feilds. 
        #required_fields = ['text', 'title', 'read_time', 'publish_date']
        # ADITYA - made headurl required for now
        

        
        if not all([title, text, read_time, publish_date, head_url]):# if any required feilds are null
            return jsonify({'error': 'Missing required fields'}), 400
        
            
        cursor = db.get_db().cursor()
        query = "INSERT INTO articles (title, text, read_time, publish_date, head_url) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(query, (title, text, read_time, publish_date, head_url))
        db.get_db().commit()
        
        new_article_id = cursor.lastrowid
        cursor.close()
        return jsonify({'message': 'Article added successfully', 'article_id': new_article_id}), 201

    except Exception as e: 
        return jsonify({'error': str(e)}), 500

@articles.route('/<int:id>', methods=['GET'])
def get_article_by_id(id):
    cursor = db.get_db().cursor()
    query = """
        SELECT
            a.article_id,
            a.title,
            a.text,
            a.read_time,
            a.head_url, 
            a.publish_date,
            COALESCE(u.user_id, -1) AS user_id,
            COALESCE(u.name, 'No author set') AS author_name,
            COALESCE(c.name, 'No category set') AS category
        FROM TaNewsDB.articles a
        LEFT JOIN TaNewsDB.article_authors aa ON a.article_id = aa.article_id
        LEFT JOIN TaNewsDB.users u ON aa.user_id = u.user_id
        LEFT JOIN TaNewsDB.article_category ac ON a.article_id = ac.article_id
        LEFT JOIN TaNewsDB.categories c ON ac.category_id = c.category_id
        WHERE a.article_id = %s
    """
    cursor.execute(query, (id,))
    article = cursor.fetchone()
    cursor.close()
    
    if article:
        return jsonify({'article': article})
    return jsonify({'error': 'Article not found'}), 404