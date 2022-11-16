-- migrate:up
CREATE TABLE branches( 
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    latitude DECIMAL(20,15) NOT NULL,
    longitude DECIMAL(20,15) NOT NULL,
    address VARCHAR(100) NOT NULL,
    email VARCHAR(50) NULL,
    phone_number VARCHAR(50) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- migrate:down
DROP TABLE branches;
