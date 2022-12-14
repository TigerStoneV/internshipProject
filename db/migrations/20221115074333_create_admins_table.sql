-- migrate:up
CREATE TABLE admins(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
user_id INT NOT NULL,
branch_id INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (branch_id) REFERENCES branches(id)
);

-- migrate:down
DROP TABLE admins;