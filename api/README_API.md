# your .env should have this:

MYSQL_HOST=db
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=TaNewsDB

MAKE SURE MYSQL_DATABASE IS TaNewsDB or this wont work/

this is the proposed file structure:

api/
├── tanews_backend/
│ ├── **init**.py # Flask app initialization
│ ├── config.py # Configuration settings
│ ├── models/ # Database models
│ │ ├── **init**.py
│ │ ├── user.py
│ │ ├── article.py
│ │ └── category.py
│ ├── routes/ # API endpoints
│ │ ├── **init**.py
│ │ ├── auth.py # Login/registration
│ │ ├── articles.py # Article CRUD
│ │ └── admin.py # Admin operations
│ └── utils/ # Helper functions
│ ├── **init**.py
│ └── db.py # Database connection
└── main.py # Entry point
