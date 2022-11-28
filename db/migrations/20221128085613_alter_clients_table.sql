-- migrate:up
ALTER TABLE clients
    MODIFY company_name VARCHAR(100) NOT NULL UNIQUE,
    MODIFY registration_number INT NOT NULL UNIQUE,
    ADD email VARCHAR(50) NOT NULL UNIQUE AFTER phone_number,
    ADD password VARCHAR(100) NOT NULL AFTER email;

-- migrate:down
DROP TABLE clients;