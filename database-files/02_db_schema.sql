-- This is a MySQL database

drop database if exists db;
create database db;
use db;

-- Add this line to verify the database was created
SELECT 'Database created successfully' as message;

create table example_table (
    id int primary key auto_increment,
    some_text varchar(255) unique not null,
    created_at datetime default current_timestamp not null,
    updated_at datetime default current_timestamp on update current_timestamp
);

-- Add this at the end to verify all tables were created
SELECT 'Schema created successfully' as message;

