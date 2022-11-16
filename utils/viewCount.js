const appDataSource = require('../models/dataSource');
const { getPost } = require('../getPost')

const viewCount = async ( req, res, next ) => {
    const queryRunner = appDataSource.createQueryRunner();
    const { type } = req.query;
    const { postId } = req.params;

    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {

        function getUserIP (req) {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            
            return ip;
        }
        if ( !req.cookies[postId] ) {
            res.cookie(postId, getUserIP(req), {
                maxAge : 60000
            })
        
            await queryRunner.query(`
                UPDATE ${getPost(type)} SET
                    view_count = view_count + 1
                WHERE id = ?
            `, [ postId ]);
        }
        
        await queryRunner.commitTransaction();
        await queryRunner.release();

        return next();
    } 
    catch (err) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();

        return next();
    }
     
}

module.exports = { viewCount }