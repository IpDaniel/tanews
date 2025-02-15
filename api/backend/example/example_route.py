from flask import jsonify, Blueprint, render_template
from backend.db_connection import db

example = Blueprint('example', __name__)

# This is an example of how to get data from the database and return it as a JSON object.
# You can use this format for most of your routes that involve database interactions.
@example.route('/get-example-data', methods=['GET'])
def get_example_data():
    cursor = db.get_db().cursor()
    cursor.execute('SELECT some_text FROM example_table LIMIT 1')
    result = cursor.fetchone()
    cursor.close()
    
    if result:
        # Print the result to debug
        print("Database result:", result)
        # Access the first column by its name or index depending on your cursor type
        return jsonify({'message': result['some_text']})
    return jsonify({'message': 'No data found'})

# This is an example of how to render a template. 
# You can use this format for most of your routes that involve sending a page to the client.
@example.route('/example-page', methods=['GET'])
def example_page():
    # the render_template functione in flask takes the name of the template and the variables 
    # you want to pass to the template. The template must be an html file in the templates folder.
    # You can also use something called Jinja2 which is a templating engine that allows you to 
    # do more complex things in the html file. I recommend not using it for this project, because
    # it is redundant to use with the backend routes, but you can check it out if you want. 
    return render_template('example.html')

