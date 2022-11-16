-- migrate:up
CREATE TABLE clients(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
    company_name VARCHAR(100) NULL,
    description VARCHAR(500) NULL,
    registration_number VARCHAR(50) NULL,
    address VARCHAR(100) NULL,
    phone_number VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
-- migrate:down
DROP TABLE clients;