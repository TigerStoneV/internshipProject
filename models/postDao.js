const appDataSource = require('./dataSource');

const getPostByPostName = async ( type, offset, limit ) => {
    let newsImageUrl = '';

    if(type == 'news') newsImageUrl = 'image_url,'; 

    try {  
        return await appDataSource.query(`
            SELECT
                title,
                content,
                view_count,
                ${newsImageUrl}
                created_at
            FROM ${type} 
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

const registerPostByAdminId = async ( type, title, content, adminId, branchId, image ) => {
    
    let newsImageUrl = '';
    let values = '';
    let valueArray = [ title, content, adminId, branchId ]

    if(image){ 
        newsImageUrl = 'image_url,';
        values = '?,'
        valueArray = [ title, content, image, adminId, branchId ];
    }

    try {
        await appDataSource.query(`
            INSERT INTO ${type}(
                title,
                content,
                ${newsImageUrl}
                admin_id,
                branch_id
            )VALUES ( ?, ?,${values} ?, ? )`,
            valueArray );
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
    
}

const deletePost = async ( type, postId ) => {
    try{
    await appDataSource.query(
        `DELETE FROM 
            ${type} 
        WHERE ${type}.id = ?`,[ postId ]
    )
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }

}

const updatePost = async ( postId, type, title, content ) => {
    
    try{
    await appDataSource.query(`
        UPDATE ${type}
            SET 
                title = ?,
                content = ?
            WHERE id = ?
    ` , [ title, content, postId ])
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
}

const getPostByPostId = async ( type, postId ) => {
    try {
        const detail = appDataSource.query(`
            SELECT
                ${type}.id,
                title,
                content,
                view_count,
                u.name
            FROM ${type}
            INNER JOIN admins a ON a.id = ${type}.admin_id
            INNER JOIN users u ON u.id = a.user_id
            WHERE ${type}.id = ? 
        `,[ postId ])

        return detail;
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
}



module.exports = {
    registerPostByAdminId,
    deletePost,
    updatePost,
    getPostByPostId,
    getPostByPostName
}