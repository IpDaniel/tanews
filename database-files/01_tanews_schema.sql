drop database if exists TaNewsDB; 

CREATE DATABASE TaNewsDB; 

USE TaNewsDB; 

CREATE TABLE User (
    user_id VARCHAR(255) PRIMARY KEY,
    full_name VARCHAR(225) NOT NULL,
    image_url VARCHAR(2083) NULL,
    isAdmin BOOLEAN
);

