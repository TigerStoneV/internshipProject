-- migrate:up
CREATE TABLE answers(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    answers TEXT NOT NULL,
    question_id INT NOT NULL,
    admin_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (admin_id) REFERENCES admins(id)
)

-- migrate:down

