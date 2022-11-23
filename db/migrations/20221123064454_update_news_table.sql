-- migrate:up
ALTER TABLE news MODIFY image_url VARCHAR(500) DEFAULT 'https://star-picker.s3.ap-northeast-2.amazonaws.com//1669185681974_star-picker.png';



-- migrate:down
