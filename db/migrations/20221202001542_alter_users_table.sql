-- migrate:up
ALTER TABLE users MODIFY google_id VARCHAR(500) NULL UNIQUE;

-- migrate:down
DROP TABLE users;