from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os


from db_connection import db
from routes.articles import articles  # Import articles route



def create_app(): 
    app = Flask(__name__)
    load_dotenv()
    # Database Configuration
    app.config['MYSQL_DATABASE_USER'] = os.getenv('DB_USER').strip()
    app.config['MYSQL_DATABASE_PASSWORD'] = os.getenv('MYSQL_ROOT_PASSWORD').strip()
    app.config['MYSQL_DATABASE_HOST'] = os.getenv('DB_HOST').strip()
    app.config['MYSQL_DATABASE_PORT'] = int(os.getenv('DB_PORT').strip())
    app.config['MYSQL_DATABASE_DB'] = os.getenv('DB_NAME').strip()
    
    
    db.init_app(app)  # Connect Flask with MySQL
    CORS(app)
    
    # test route
    @app.route('/api/health', methods=['GET'])
    def test():
        return jsonify({'message': 'TaNews API is running!'})
    
    # Register Routes
    app.register_blueprint(articles, url_prefix='/api/articles')
    
    return app

 
 
if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=4000)         
    
    