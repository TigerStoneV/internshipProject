-- migrate:up
ALTER TABLE branches
    MODIFY email VARCHAR(50) NOT NULL UNIQUE,
    ADD name VARCHAR(20) NOT NULL UNIQUE AFTER id,
    ADD password VARCHAR(100) NOT NULL AFTER email,
    MODIFY phone_number VARCHAR(50) NULL AFTER address;

-- migrate:down
DROP TABLE branches;