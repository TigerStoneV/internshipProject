const postService = require('../services/postService');
const { catchAsync } = require('../utils/error');

const getNewsAll = async ( req, res ) => {
    const { offset, limit } = req.query;
    
    if( !offset || !limit ){
        const error = new Error('KEY ERROR');
        throw error;
    }

    const posts = await postService.getNewsAll( +offset, +limit );

    res.status(200).json({ data : posts });
}

const getNoticeAll = async ( req, res ) => {
    const { offset, limit } = req.query;

    if( !offset || !limit ){
        const error = new Error('KEY ERROR');
        throw error;
    }

    const posts = await postService.getNoticeAll( +offset, +limit );

    res.status(200).json({ data : posts });
}

const getQuestionAll = async ( req, res ) => {
    const { offset, limit } = req.query;

    if( !offset || !limit ){
        const error = new Error('KEY ERROR');
        throw error;
    }

    const posts = await postService.getQuestionAll( +offset, +limit );

    res.status(200).json({ data : posts });
}


const postNewsByAdminId = catchAsync( async (req, res) => {

    const { adminId, title, content, branchId, imageUrl } = req.body;

    if ( !adminId || !title || !content || !branchId ) {
        const error = new Error('KEY ERROR');
        error.statusCode = 400;
        throw error;
    }

    await postService.postNewsByAdminId( title, content, +adminId, +branchId, imageUrl );

    res.status(201).json({ message : 'SUCCESS' });
});

const postNoticeByAdminId = catchAsync( async (req, res) => {
    const { adminId, title, content, branchId } = req.body;

    if ( !adminId || !title || !content || !branchId ) {
        const error = new Error('KEY ERROR');
        error.statusCode = 400;
        throw error;
    }

    await postService.postNoticeByAdminId( title, content, +adminId, +branchId );

    res.status(201).json({ message : 'SUCCESS' });
})

const postQuestionByUserId = catchAsync( async (req, res) => {
    const { userId, title, content, branchId } = req.body;

    if ( !userId || !title || !content || !branchId ) {
        const error = new Error('KEY ERROR');
        error.statusCode = 400;
        throw error;
    }

    await postService.postQuestionByUserId( title, content, +userId, +branchId );

    res.status(201).json({ message : 'SUCCESS' });
})


const updateNews = catchAsync( async (req, res) => {
    const { newsId } = req.params;
    const { title, content } = req.body;
    
    await postService.updateNews( +newsId, title, content );
    
    res.status(200).json({ message : 'update complete '});
});

const updateNotice = catchAsync( async (req, res) => {
    const { noticeId } = req.params;
    const { title, content } = req.body;

    await postService.updateNotice( +noticeId, title, content );
    
    res.status(200).json({ message : 'update complete '});
});

const updateQuestion = catchAsync( async (req, res) => {
    const { questionId } = req.params;
    const { title, content } = req.body;

    await postService.updateQuestion( +questionId, title, content );
    
    res.status(200).json({ message : 'update complete '});
});

const deleteNews = catchAsync( async (req, res) => {
    const { newsId } = req.params;
    
    await postService.deleteNews( +newsId );
    
    res.status(200).json({ message : 'delete complete' });
});

const deleteNotice = catchAsync( async (req, res) => {
    const { noticeId } = req.params;
    
    await postService.deleteNotice( +noticeId );
    
    res.status(200).json({ message : 'delete complete' });
});

const deleteQuestion = catchAsync( async (req, res) => {
    const { questionId } = req.params;
    
    await postService.deleteQuestion( +questionId );
    
    res.status(200).json({ message : 'delete complete' });
});

const getNewsByNewsId = catchAsync( async (req, res) => {
    const { postId } = req.params;
    
    const detail = await postService.getNewsByNewsId( postId );

   return res.status(200).json({ data : detail });
});

const getNoticeByNoticeId = catchAsync( async (req, res) => {
    const { postId } = req.params;
    
    const detail = await postService.getNoticeByNoticeId( postId );

   return res.status(200).json({ data : detail });
});

const getQuestionByQuestionId = catchAsync( async (req, res) => {
    const { postId } = req.params;
    
    const detail = await postService.getQuestionByQuestionId( postId );

   return res.status(200).json({ data : detail });
});

module.exports = { 
    postNewsByAdminId,
    postNoticeByAdminId,
    postQuestionByUserId,
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