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
├── tanews_backend/ - db_connection/ - routes/ - articles.py (Naman started, patty will finish) => liking, posting, getting, everything functionality. - users.py => adding users, admin, authors, etc.

## What the fuck just happened (JWT, HASHING, Authorization):

- added a requirement in requirements.txt (jwt package)
- added a bunch of boilerplate code in the create_app() method in tanews_backend.py.
- added three new routes, http://locahost:4000/api/users/register [POST]

  - takes in a whole json user object, with at least name, email, and password required. - HASHES the password and stores it in the database
  - i commented out the password hashing for now, as using postman is really easy and uncomplicated without having to copy paste the hashed values of simple passwords all the time.

- how it works:
  - ONCE user is registered (5 of us are registered because of the sample data file, so it doesnt latter)
  - if user is registered, if a POST request is made to /api/user/login, with only email and password values, and if the values are found in the db, then user is logged in, and a JWT TOKEN IS RETURNED.
  - THIS JSON WEB TOKEN IS IMPORTANT AS FUCK. it is valid for ONE hour. we need this token to access protected (eg: admin) pages. GO TEST ON POSTMAN RIGHT NOW!!!

TLDR:

1. User registers → Their credentials are stored in the database.
2. User logs in → The backend verifies credentials, then generates a JWT token.
3. JWT is stored client-side → The frontend uses it for authentication.
4. Protected routes require JWT → The backend validates the JWT on every request.

protected pages require a JWT Authorization header:
Authorization: Bearer <JWT_TOKEN>
