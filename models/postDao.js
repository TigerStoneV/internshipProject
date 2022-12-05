const appDataSource = require('./dataSource');

const getNewsAll = async ( offset, limit ) => {
    try {  
        return await appDataSource.query(`
            SELECT
                id,
                title,
                content,
                view_count AS viewCount,
                image_url AS imageUrl,
                created_at AS createdAt
            FROM news 
            LIMIT ?,?
        `, [offset, limit]
        )
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
}

const getNoticeAll = async ( offset, limit ) => {
    try {
        return await appDataSource.query(`
            SELECT
                id,
                title,
                content,
                view_count AS viewCount,
                created_at AS createdAt
            FROM notices
            LIMIT ?,?
        `, [offset, limit]
        )
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
}


const getQuestionAll = async ( offset, limit ) => {
    try {
        return await appDataSource.query(`
            SELECT
                id,
                title,
                content,
                view_count AS viewCount,
                created_at AS createdAt
            FROM questions
            LIMIT ?,?
        `, [offset, limit]
        )
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
}

const postNewsByAdminId = async ( title, content, adminId, branchId, image ) => {
    
    if(image) image = `'${image}'`;
    try {
        await appDataSource.query(`
            INSERT INTO news(
                title,
                content,
                image_url,
                admin_id,
                branch_id
            )VALUES ( ?, ?, ${image ? image : 'DEFAULT' }, ?, ? )`,
            [ title, content, adminId, branchId ]);
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
    
}

const postNoticeByAdminId = async ( title, content, adminId, branchId ) => {
    try {
        await appDataSource.query(`
            INSERT INTO notices(
                title,
                content,
                admin_id,
                branch_id
            )VALUES ( ?, ?, ?, ? )`,
            [ title, content, adminId, branchId ]);
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
    
}

const postQuestionByUserId = async ( title, content, userId, branchId ) => {
    try {
        await appDataSource.query(`
            INSERT INTO questions(
                title,
                content,
                user_id,
                branch_id
            )VALUES ( ?, ?, ?, ? )`,
            [ title, content, userId, branchId ]);
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
    
}


const deleteNews = async ( newsId ) => {
    try{
        await appDataSource.query(
            `DELETE FROM 
                news
            WHERE news.id = ?`,[ newsId ]
        )
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
}

const deleteNotice = async ( noticeId ) => {
    try{
        await appDataSource.query(
            `DELETE FROM 
                notices
            WHERE notices.id = ?`,[ noticeId ]
        )
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
}

const deleteQuestion = async ( questionId ) => {
    try{
        await appDataSource.query(
            `DELETE FROM 
                questions
            WHERE questions.id = ?`,[ questionId ]
        )
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
}

const updateNews = async ( newsId, title, content ) => {
    try{
    await appDataSource.query(`
        UPDATE news
            SET 
                title = ?,
                content = ?
            WHERE id = ? 
    ` , [ title, content, newsId ])
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
}

const updateNotice = async ( noticeId, title, content ) => {
    try{
    await appDataSource.query(`
        UPDATE notices
            SET 
                title = ?,
                content = ?
            WHERE id = ? 
    ` , [ title, content, noticeId ])
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
}

const updateQuestion = async ( questionId, title, content ) => {
    try{
    await appDataSource.query(`
        UPDATE questions
            SET 
                title = ?,
                content = ?
            WHERE id = ? 
    ` , [ title, content, questionId ])
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
}

const getNewsByNewsId = async ( newsId ) => {
    try {
        const detail = appDataSource.query(`
            SELECT
                n.id,
                title,
                content,
                view_count AS viewCount,
                image_url AS imageUrl,
                u.name AS adminName
            FROM news n
            INNER JOIN admins a ON a.id = n.admin_id
            INNER JOIN users u ON u.id = a.user_id
            WHERE n.id = ? 
        `,[ newsId ])

        return detail;
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
}

const getNoticeByNoticeId = async ( noticeId ) => {
    try {
        const detail = appDataSource.query(`
            SELECT
                n.id,
                title,
                content,
                view_count AS viewCount,
                u.name AS adminName
            FROM notices n
            INNER JOIN admins a ON a.id = n.admin_id
            INNER JOIN users u ON u.id = a.user_id
            WHERE n.id = ? 
        `,[ noticeId ])
        
        return detail;
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
}

const getQuestionByQuestionId = async ( questionId ) => {
    try {
        const detail = appDataSource.query(`
            SELECT
                q.id,
                title,
                content,
                view_count AS viewCount,
                u.name AS adminName
            FROM questions q
            INNER JOIN users u ON u.id = q.user_id
            WHERE q.id = ? 
        `,[ questionId ])
        
        return detail;
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
}




module.exports = {
    postNoticeByAdminId,
    postNewsByAdminId,
    postQuestionByUserId,
    deleteNews,
    deleteNotice,
    deleteQuestion,
    updateNews,
    updateNotice,
    updateQuestion,
    getNewsByNewsId,
    getNoticeByNoticeId,
    getQuestionByQuestionId,
    getNoticeAll,
    getNewsAll,
    getQuestionAll
}