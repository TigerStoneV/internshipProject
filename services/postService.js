const postDao = require('../models/postDao');


const getPostByPostName = async ( type, offset, limit ) => {

    return await postDao.getPostByPostName( type, offset, limit );
}

const registerPostByAdminId = async ( type, title, content, adminId, branchId, image ) => {

    return await postDao.registerPostByAdminId( type, title, content, adminId, branchId, image );
}

const updatePost = async ( postId, type, title, content ) => {
    const updatePost = postDao.updatePost( postId, type, title, content );
    
    return updatePost
}

const deletePost = async ( type, postId ) => {
    const deletePostId = postDao.deletePost( type, postId );

    return deletePostId;
}

const getPostByPostId = async ( type, postId ) => {
    const getPostDetail = postDao.getPostByPostId( type, postId );

    return getPostDetail;
}





module.exports = { 
    registerPostByAdminId,
    updatePost,
    deletePost,
    getPostByPostId,
    getPostByPostName
}