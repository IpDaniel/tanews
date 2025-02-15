# to restart docker:

docker-compose down
docker-compose up --build

docker-compose up

# to start python venv (idk why I need this figure out why python installation doesnt work)

source api/venv/bin/activate

cd api

python \***\*\_\*\***file\_\_\_\_

# endpoints checked for first week (in prep for TCF #2 on 2/18)

- http://localhost:4000/example/example-page
  - running a get request on this url with postman gives us the HTML markup
  - Shows a dashboard. (when opened on browser)
  - can 'get' data from the database (sends a get request to /example/get-example-data)
    - this always returns a JSON with "message" : "example text"
    -
  -
  - Sample form (idk whats going on here I don't think it's implemented. )

# understanding the docker-compose.yaml file:

## code:

services:
api:
build: ./api
container_name: tanews_app_api
hostname: web-api
volumes: ["./api:/apicode"]
ports: - 4000:4000 \* specifying which port to run on!!
env_file: ./api/.env

db:
env_file: - ./api/.env
image: mysql:8.0
container_name: tanews_app_db
hostname: db
volumes: - ./database-files:/docker-entrypoint-initdb.d/:ro
ports: - 3200:3306

## Explaination:

- "services" : this dection declared the different services (Docker containers) that will run together.
- the setup has two services:

  - api (THE FLASK BACKEND!!! )
  - db (MySql database)

  * A Docker image is a template for a Docker container, while a Docker container is a running instance of that template

- API: builds a docker image for the API using the Dockerfile in ./api/

  - container_name : tanews_app_api
  - hostname : web-api [idk what this means]
  - the volumes command allows for live code updates (fof example, when I run a get call on postman, it shows up on iterm)
  - ports: 4000:4000 -> maps the 4000 port on MY MAC to the 4000 port in the container
  - loads .env file in the api dir (which we were told to make and add our root and a password so the database authorizes us and knows which one of us is making the change?)
  -

  -

- db:
  - env file
  - uses mysql version 8.0 (uses an image template from docker hub)
  - ports : 3200:3306 -> 3200 port on my mac and 3306 on docker container (is there any significance for these specific port numbers? )
  -

* How this all works:
  - docker-compose up --build
    - Docker creates a network and launches two containers (as seen on docker desktop)
    - flask reads env variables from .env, which includes mysql creds

## checking if docker containers are running:

docker ps

## the DockerFile in the api dir:

- uses python version 3.11-slim (smaller version for efficiency???)
- installs the reqirements.txt file in the api directory so all that is in the docker container now
- CMD [Python, backend_app.py] -> tells docker how to actually run the flask container automatically

## what is docker and why do we need it?

- Docker is a a containerization platform which allows us to package and run applications in isolated environments called containers.
- it ensures that:

  - the app works the same way for everyone
  - avoids "it runs on my machine" problems
  - easily manage version differrences (eg hardcoded python and sql versions)
  - does the work for us, so one of our machines is not allways running a flask server when we deploy the app

- key distinction between images and containers:
  - an image is a static blueprint
  - a container is an instance of an image (sometimes we build our own image, like in the Dockerfile, and other times we use template images like how we set up mysql??)
  -

## Project setup and files that Daniel set up:

- api/backend/templates/example.html:

  - the blank html code that shows up when we go to localhost:4000/exanple/example-page. there is in internal API call to the fetchExamleData() defined in api/backend/static/js/example_script.js, which then requests a POST request to localhost:4000/example/get-example-data, which always returns "example text"

  - i dont really see anything else interesting in this file.

- example_route_py:

  - sets up a basic basic flask app which has two api endpoints. we covered these above.
  - when I changed the endpoint from render_template from example.html to article.html the thing crashed. I tried to restart docker, but it doesdnt work. same goes for edit_article.html.
  -

- 01_schema.sql:

  - creating a very simple 'example_table' table in mysql. not much to talk about.
  - primary key, some_text, created_at, updated_at
  - created a database and a schema.

- 02_example_data.sql:

  - inserting 'example text' into example_table made in 01_schema.sql.
  - sends a success message.

- article.txt files in database-files/
  - the hardcoded text data that daniel used in his initial project. cool that he included it.
