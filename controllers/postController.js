const postService = require('../services/postService');
const { catchAsync } = require('../utils/error');
const { getPost } = require('../getPost');

const getPostByPostName = async ( req, res ) => {
    
    const { type, offset, limit } = req.query;

    if( !type || !offset || !limit ){
        const error = new Error('KEY ERROR');
        error.statusCode = 400;
        throw error;
    }
        
        const posts = await postService.getPostByPostName(
            getPost(type),
            +offset,
            +limit
        );

        res.status(200).json({ data : posts });
}

const registerPostByAdminId = catchAsync( async (req, res) => {

    const { type } = req.query;
    const { adminId, title, content, branchId } = req.body;
    let image = ''
    
    if(req.file)image = req.file.location;

    if ( !adminId || !title || !content || !branchId ) {
        const error = new Error('KEY ERROR');
        error.statusCode = 400;
        throw error;
    }

    await postService.registerPostByAdminId( getPost(type), title, content, +adminId, +branchId, image );

    res.status(201).json({ message : 'SUCCESS' });
});

const updatePost = catchAsync( async (req, res) => {
    const { postId } = req.params;
    const { type } = req.query;
    const { title, content } = req.body;

    await postService.updatePost( +postId, getPost(type), title, content );
    
    res.status(200).json({ mesage : 'update complete '});
});

const deletePost = catchAsync( async (req, res) => {
    const { type } = req.query;
    const { postId } = req.params;
    
    await postService.deletePost( getPost(type), +postId );
    
    res.status(200).json({ message : 'delete complete' });
});

const getPostByPostId = catchAsync( async (req, res) => {
    const { postId } = req.params;
    const { type } = req.query;
    
    const detail = await postService.getPostByPostId( getPost(type), postId);

   return res.status(200).json({ data : detail });
});

module.exports = { 
    registerPostByAdminId,
    updatePost,
    deletePost,
    getPostByPostId,
    getPostByPostName
}