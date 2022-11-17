-- migrate:up
ALTER TABLE questions ALTER COLUMN image_url SET DEFAULT 'https://star-picker.s3.ap-northeast-2.amazonaws.com/star-picker.png';

-- migrate:down

