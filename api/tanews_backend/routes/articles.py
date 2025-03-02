from flask import Blueprint, jsonify, request
from db_connection import db


articles = Blueprint('articles', __name__)


@articles.route('/', methods=['GET'])
def get_articles():
    cursor = db.get_db().cursor()
    cursor.execute("SELECT * FROM users ORDER BY publish_date DESC")
    articles = cursor.fetchall()
    cursor.close()
    return jsonify({'articles': articles})