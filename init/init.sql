CREATE DATABASE IF NOT EXISTS w3hetic_db;
USE w3hetic_db;

CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,  -- in bytes
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_files (
    user_id INT NOT NULL,
    file_id INT NOT NULL,
    PRIMARY KEY (user_id, file_id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (file_id) REFERENCES files(id) ON DELETE CASCADE
);

CREATE OR REPLACE VIEW user_total_upload_size AS
SELECT uf.user_id, SUM(f.file_size) AS total_upload_size
FROM user_files uf
JOIN files f ON uf.file_id = f.id
GROUP BY uf.user_id;

DELIMITER $$

CREATE TRIGGER before_file_insert
BEFORE INSERT ON files
FOR EACH ROW
BEGIN
    DECLARE user_size BIGINT;

    SELECT IFNULL(SUM(f.file_size), 0) INTO user_size
    FROM user_files uf
    JOIN files f ON uf.file_id = f.id
    WHERE uf.user_id = NEW.user_id;

    IF user_size + NEW.file_size > 2147483648 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'User upload limit of 2GB exceeded';
    END IF;
END$$

DELIMITER ;