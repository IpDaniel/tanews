from flask import Blueprint, jsonify, request
import requests
from db_connection import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity



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
            a.head_url, 
            a.publish_date,
            GROUP_CONCAT(DISTINCT COALESCE(u.user_id, -1)) AS user_ids,
            GROUP_CONCAT(DISTINCT COALESCE(u.name, 'No author set') SEPARATOR ', ') AS author_names,
            GROUP_CONCAT(DISTINCT COALESCE(c.name, 'No category set') SEPARATOR ', ') AS category
        FROM TaNewsDB.articles a
        LEFT JOIN TaNewsDB.article_authors aa ON a.article_id = aa.article_id
        LEFT JOIN TaNewsDB.users u ON aa.user_id = u.user_id
        LEFT JOIN TaNewsDB.article_category ac ON a.article_id = ac.article_id
        LEFT JOIN TaNewsDB.categories c ON ac.category_id = c.category_id
        GROUP BY a.article_id;
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



# route to get a category id
@articles.route('/categories/<string:category>', methods=['GET'])
def get_article_id(category):
    try:
        cursor = db.get_db().cursor()
        query = 'SELECT category_id FROM categories WHERE name = %s'
        cursor.execute(query, (category,))
        category_data = cursor.fetchone()

        if category_data:
            category_id = category_data.get('category_id')
        else:
            return jsonify({"error": f"Category '{category}' not found"}), 404
        return jsonify({"category_id": category_id}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred with category '{category}': {str(e)}"}), 500
    finally:
        if cursor:
            cursor.close()


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
        read_time = data.get("read_time")
        publish_date = data.get("publish_date")
        authors = data.get("authors")  # List of author IDs
        num_authors = len(authors)
        categories = data.get("categories")  # List of category IDs
        head_url = data.get("head_url")
        text = data.get("text")
        
        
        # current state of the schema, these are the required feilds. 
        #required_fields = ['text', 'title', 'read_time', 'publish_date']
        # ADITYA - made headurl required for now
        

        
        if not all([title, text, read_time, publish_date, head_url, authors]):# if any required feilds are null
            return jsonify({'error': 'Missing required fields'}), 400
        
            
        cursor = db.get_db().cursor()
        query = "INSERT INTO articles (title, text, read_time, publish_date, head_url) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(query, (title, text, read_time, publish_date, head_url))
        db.get_db().commit()
        
        new_article_id = cursor.lastrowid


        
        # CURRENT IMPLEMENTATION - only add 1 category that exists
        query = 'SELECT category_id FROM categories WHERE name = %s'
        cursor.execute(query, (categories,))
        category_id = cursor.fetchone()
        category_id = category_id.get('category_id')

        query = "INSERT INTO TaNewsDB.article_category (article_id, category_id) VALUES (%s, %s)"
        cursor.execute(query, (new_article_id, category_id))

        db.get_db().commit()
        

        # add article authors

        for id in authors:
            query = 'INSERT INTO TaNewsDB.article_authors (user_id, article_id) VALUES (%s, %s)'
            cursor.execute(query, (id, new_article_id,))
            db.get_db().commit()

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
            GROUP_CONCAT(DISTINCT COALESCE(u.user_id, -1)) AS user_ids,
            GROUP_CONCAT(DISTINCT COALESCE(u.name, 'No author set') SEPARATOR ', ') AS author_names,
            GROUP_CONCAT(DISTINCT COALESCE(c.name, 'No category set') SEPARATOR ', ') AS category
        FROM TaNewsDB.articles a
        LEFT JOIN TaNewsDB.article_authors aa ON a.article_id = aa.article_id
        LEFT JOIN TaNewsDB.users u ON aa.user_id = u.user_id
        LEFT JOIN TaNewsDB.article_category ac ON a.article_id = ac.article_id
        LEFT JOIN TaNewsDB.categories c ON ac.category_id = c.category_id
        WHERE a.article_id = %s
        GROUP BY a.article_id;
    """
    cursor.execute(query, (id,))
    article = cursor.fetchone()
    # article = cursor.fetchall()
    cursor.close()
    
    if article:
        return jsonify({'article': article})
    return jsonify({'error': 'Article not found'}), 404

@articles.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_article(id):
    try:
        user_id = get_jwt_identity()
        
        # Check if user is admin
        cursor = db.get_db().cursor()
        cursor.execute("SELECT is_admin FROM users WHERE user_id = %s", (user_id,))
        user = cursor.fetchone()
        
        if not user or not user["is_admin"]:
            return jsonify({"error": "Unauthorized. Only admins can update articles."}), 403

        data = request.get_json()
        
        # Update article
        cursor.execute("""
            UPDATE TaNewsDB.articles 
            SET title = %s, read_time = %s, 
                publish_date = %s, head_url = %s, text = %s
            WHERE article_id = %s
        """, (
            data['title'],
            data['read_time'],
            data['publish_date'],
            data['head_url'],
            data['text'],
            id
        ))
        
        # Update category
        if 'category' in data:
            # First get the category ID
            cursor.execute("SELECT category_id FROM TaNewsDB.categories WHERE name = %s", (data['category'],))
            category = cursor.fetchone()
            
            if category:
                # Update the article_category table
                cursor.execute("""
                    UPDATE TaNewsDB.article_category 
                    SET category_id = %s 
                    WHERE article_id = %s
                """, (category['category_id'], id))
        
        # Update authors
        if 'authors' in data and data['authors']:
            # First remove existing authors
            cursor.execute("DELETE FROM TaNewsDB.article_authors WHERE article_id = %s", (id,))
            
            # Get user_id from author name
            query = 'SELECT user_id FROM users WHERE name = %s'
            cursor.execute(query, (data['authors'],))
            author = cursor.fetchone()
            
            if author:
                # Add the new author
                cursor.execute("""
                    INSERT INTO TaNewsDB.article_authors (article_id, user_id)
                    VALUES (%s, %s)
                """, (id, author['user_id']))
        
        db.get_db().commit()
        return jsonify({"message": "Article updated successfully"}), 200
        
    except Exception as e:
        db.get_db().rollback()
        print(f"Error updating article: {str(e)}")  # Add logging
        return jsonify({"error": f"Failed to update article: {str(e)}"}), 500
    finally:
        if cursor:
            cursor.close()