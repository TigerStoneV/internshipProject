-- migrate:up
ALTER TABLE riders MODIFY user_id INT NOT NULL UNIQUE;

-- migrate:down
DROP TABLE riders;