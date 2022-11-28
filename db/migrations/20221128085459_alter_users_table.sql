-- migrate:up
ALTER TABLE users
    RENAME COLUMN social_id1 to kakao_id,
    RENAME COLUMN social_id2 to google_id,
    MODIFY client_id INT NULL,
    ADD verification_code VARCHAR(50) NULL AFTER phone_number,
    ADD client_admin tinyint(1) NULL AFTER client_id,
    ADD password VARCHAR(100) NULL AFTER email;

-- migrate:down
DROP TABLE users;