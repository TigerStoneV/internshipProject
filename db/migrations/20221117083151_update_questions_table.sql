-- migrate:up
ALTER TABLE `questions` ADD `image_url` VARCHAR(500) AFTER `content`;

-- migrate:down

