-- migrate:up
ALTER TABLE users MODIFY google_id BIGINT NULL UNIQUE;

-- migrate:down
DROP TABLE users;