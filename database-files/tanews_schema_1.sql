drop database if exists TaNewsDB; 

CREATE DATABASE TaNewsDB; 

USE TaNewsDB; 

CREATE TABLE User (
    user_id VARCHAR(255) PRIMARY KEY,
    image_url VARCHAR(2083),
    isAdmin BOOLEAN
);

