const postDao = require('../models/postDao');


const getNewsAll = async ( offset, limit ) => {

    return await postDao.getNewsAll( offset, limit );
}

const getNoticeAll = async ( offset, limit ) => {

    return await postDao.getNoticeAll( offset, limit );
}

const getQuestionAll = async ( offset, limit ) => {

    return await postDao.getQuestionAll( offset, limit );
}

const postNewsByAdminId = async ( title, content, adminId, branchId, image ) => {

    return await postDao.postNewsByAdminId( title, content, adminId, branchId, image );
}

const postNoticeByAdminId = async ( title, content, adminId, branchId ) => {

    return await postDao.postNoticeByAdminId( title, content, adminId, branchId );
}

const postQuestionByAdminId = async ( title, content, adminId, branchId ) => {

    return await postDao.postQuestionByAdminId( title, content, adminId, branchId );
}

const updateNews = async ( newsId, title, content ) => {
    const updateNews = postDao.updateNews( newsId, title, content );
    
    return updateNews;
}

const updateNotice = async ( noticeId, title, content ) => {
    const updateNotice = postDao.updateNotice( noticeId, title, content );
    
    return updateNotice;
}

const updateQuestion = async ( questionId, title, content ) => {
    const updateQuestion = postDao.updateQuestion( questionId, title, content );
    
    return updateQuestion;
}

const deleteNews = async ( newsId ) => {
    const deleteNewsByNewsId = postDao.deleteNews( newsId );

    return deleteNewsByNewsId;
}

const deleteNotice = async ( noticeId ) => {
    const deleteNoticeByNoticeId = postDao.deleteNotice( noticeId );

    return deleteNoticeByNoticeId;
}

const deleteQuestion = async ( questionId ) => {
    const deleteQuestionByQuestionId = postDao.deleteQuestion( questionId );

    return deleteQuestionByQuestionId;
}

const getNewsByNewsId = async ( newsId ) => {
    const getNewsDetail = postDao.getNewsByNewsId( newsId );

    return getNewsDetail;
}

const getNoticeByNoticeId = async ( noticeId ) => {
    const getNoticeDetail = postDao.getNoticeByNoticeId( noticeId );

    return getNoticeDetail;
}

const getQuestionByQuestionId = async ( questionId ) => {
    const getQuestionDetail = postDao.getQuestionByQuestionId( questionId );

    return getQuestionDetail;
}






module.exports = { 
    postNewsByAdminId,
    postNoticeByAdminId,
    postQuestionByAdminId,
    updateNews,
    updateNotice,
    updateQuestion,
    deleteNews,
    deleteNotice,
    deleteQuestion,
    getNewsByNewsId,
    getNoticeByNoticeId,
    getQuestionByQuestionId,
    getNewsAll,
    getNoticeAll,
    getQuestionAll
}