# Add to your imports
import os
import requests
from flask import jsonify, Blueprint

# Add this environment variable to your configuration
WEATHER_API_KEY = os.getenv('WEATHER_API_KEY')

weather = Blueprint('weather', __name__)

# Add this route
@weather.route('/')
def get_weather():
    try:
        response = requests.get(
            'https://api.openweathermap.org/data/2.5/weather',
            params={
                'lat': '38.984216',
                'lon': '-77.094418',
                'appid': WEATHER_API_KEY,
                'units': 'imperial'
            }
        )
        return jsonify(response.json())
    except Exception as e:
        return jsonify({'error': str(e)}), 500