-- migrate:up
CREATE TABLE chattings(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    user_id INT NULL,
    admin_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (admin_id) REFERENCES admins(id)
);

-- migrate:down
DROP TABLE chattings;
