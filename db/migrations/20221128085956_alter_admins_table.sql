-- migrate:up
ALTER TABLE admins
    ADD riderlog_editor TINYINT(1) NOT NULL AFTER branch_id;

-- migrate:down
DROP TABLE admins;