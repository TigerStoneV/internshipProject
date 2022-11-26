const postDao = require('../models/postDao');


const getNewsAll = async ( offset, limit ) => {

    return await postDao.getNewsAll( offset, limit );
}

const getNoticeAll = async ( offset, limit ) => {

    return await postDao.getNoticeAll( offset, limit );
}

const postNewsByAdminId = async ( title, content, adminId, branchId, image ) => {

    return await postDao.postNewsByAdminId( title, content, adminId, branchId, image );
}

const postNoticeByAdminId = async ( title, content, adminId, branchId ) => {

    return await postDao.postNoticeByAdminId( title, content, adminId, branchId );
}

const updateNews = async ( newsId, title, content ) => {
    const updateNews = postDao.updateNews( newsId, title, content );
    
    return updateNews
}

const updateNotice = async ( noticeId, title, content ) => {
    const updateNotice = postDao.updateNotice( noticeId, title, content );
    
    return updateNotice
}

const deleteNews = async ( newsId ) => {
    const deleteNewsByNewsId = postDao.deleteNews( newsId );

    return deleteNewsByNewsId;
}

const deleteNotice = async ( noticeId ) => {
    const deleteNoticeByNoticeId = postDao.deleteNotice( noticeId );

    return deleteNoticeByNoticeId;
}

const getNewsByNewsId = async ( newsId ) => {
    const getNewsDetail = postDao.getNewsByNewsId( newsId );

    return getNewsDetail;
}

const getNoticeByNoticeId = async ( noticeId ) => {
    const getNoticeDetail = postDao.getNoticeByNoticeId( noticeId );

    return getNoticeDetail;
}






module.exports = { 
    postNewsByAdminId,
    postNoticeByAdminId,
    updateNews,
    updateNotice,
    deleteNews,
    deleteNotice,
    getNewsByNewsId,
    getNoticeByNoticeId,
    getNewsAll,
    getNoticeAll
}