
DROP DATABASE IF EXISTS TaNewsDB;
CREATE DATABASE IF NOT EXISTS TaNewsDB
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE TaNewsDB;

-- 1) Users Table
CREATE TABLE users (
    user_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT 0,
    is_author BOOLEAN NOT NULL DEFAULT 0,
    image_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
) ENGINE = InnoDB;

-- 2) Articles Table
CREATE TABLE articles (
    article_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    read_time INT,
    publish_date DATETIME,
    update_date DATETIME,
    PRIMARY KEY (article_id)
) ENGINE = InnoDB;

-- 3) Authorship (bridge for many-to-many: Users <-> Articles)
CREATE TABLE article_authors (
    user_id INT UNSIGNED NOT NULL,
    article_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (user_id, article_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles(article_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE = InnoDB;

-- 4) Categories Table
CREATE TABLE categories (
    category_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    PRIMARY KEY (category_id)
) ENGINE = InnoDB;

-- 5) Article_Category (bridge for many-to-many: Articles <-> Categories)
CREATE TABLE article_category (
    article_id INT UNSIGNED NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (article_id, category_id),
    FOREIGN KEY (article_id) REFERENCES articles(article_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE = InnoDB;

-- 6) Images Table
CREATE TABLE images (
    image_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    PRIMARY KEY (image_id)
) ENGINE = InnoDB;

-- 7) Article_Images (bridge for one-to-many or many-to-many: Articles <-> Images)
--    Allows storing multiple images for an article and specifying their position/order
CREATE TABLE article_images (
    article_image_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    article_id INT UNSIGNED NOT NULL,
    image_id INT UNSIGNED NOT NULL,
    position INT NOT NULL,
    PRIMARY KEY (article_image_id),
    FOREIGN KEY (article_id) REFERENCES articles(article_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (image_id) REFERENCES images(image_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE = InnoDB;

-- 8) Article_Likes (bridge for many-to-many: Users <-> Articles, storing likes)
CREATE TABLE article_likes (
    user_id INT UNSIGNED NOT NULL,
    article_id INT UNSIGNED NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, article_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles(article_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE = InnoDB;

