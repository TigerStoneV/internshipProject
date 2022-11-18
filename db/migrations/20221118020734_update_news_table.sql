-- migrate:up
ALTER TABLE news ADD image_url VARCHAR(500) DEFAULT 'https://star-picker.s3.ap-northeast-2.amazonaws.com/star-picker.png' NOT NULL AFTER content;

-- migrate:down

