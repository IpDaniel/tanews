# `database-files` Folder

TODO: Put some notes here about how this works. include how to re-bootstrap the db.

#### naman was here

- rebootstrapping a database means resetting and reinitializing it. this involved deleting the existing database, recreating thre schema. and loading seed or initial data into it.
- we do this to start fresh, to apply new schema changes, or to fix corrupted data that we want to get rid of. this also helps for automation

01_schema.sql and 02_exanple_data.sql work together to reinitialize and re-bootstrap our database. I think when we first run docker, it runs both these files. first, it drops the database if it exits, then it reinitializes it, and uses it to set up the schema I described. then the example_data file just adds one line of text to the datase.

- to test this, i messed with the 02_example_data.sql file to see what this would change. I changed the text from "example text" to something else, saved the file, restarted docker, and tried clicking the get data from database button from our main api endpoint.
- update: that didnt work it still returns example text but idk why

- update to the update: i went into mysql workbench and removed the intial exmple text and inseted something else, and now it shows the text "naman is here"
- ran a bunch of stuff in sql into the example_database,

- i saw a bunch of files and stuff but an api end point that daniel set up is http://localhost:4000/weather/ .
  the message received is invalid api key.
