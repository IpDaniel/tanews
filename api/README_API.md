# your .env should have this:

MYSQL_HOST=db
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=TaNewsDB

        MAKE SURE MYSQL_DATABASE IS TaNewsDB or this wont work/


## how to run this app: 
- pull from main [every time before you start developing]
- docker-compose down
- docker-compose up --build
=> go to http://localhost:4000/api/health to see if you get a success messahe

this is the proposed file structure:

api/
├── tanews_backend/
        - db_connection/
        - routes/
            - articles.py (Naman started, patty will finish) => liking, posting, getting, everything functionality. 
            - users.py => adding users, admin, authors, etc.
            
