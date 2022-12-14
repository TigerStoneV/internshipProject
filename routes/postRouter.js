const postRouter = require('express').Router();
const { viewCount } = require('../utils/viewCount');
const { imageUploader } = require('../utils/imageUploader');
const postController = require('../controllers/postController');
const { adminLoginRequired } = require('../utils/auth');
const { userLoginRequired } = require('../utils/auth');

postRouter.get('/news', postController.getNewsAll);
postRouter.get('/notice', postController.getNoticeAll);
postRouter.get('/question', postController.getQuestionAll)
postRouter.post('/news', adminLoginRequired, postController.postNewsByAdminId);
postRouter.post('/notice', adminLoginRequired, postController.postNoticeByAdminId);
postRouter.post('/question', userLoginRequired, postController.postQuestionByUserId);
postRouter.patch('/news/:newsId',postController.updateNews);
postRouter.patch('/notice/:noticeId',postController.updateNotice);
postRouter.patch('/question/:questionId',postController.updateQuestion);
postRouter.delete('/news/:newsId', postController.deleteNews);
postRouter.delete('/notice/:noticeId', postController.deleteNotice);
postRouter.delete('/question/:questionId', postController.deleteQuestion);
postRouter.get('/news/:postId', viewCount, postController.getNewsByNewsId);
postRouter.get('/notice/:postId', viewCount, postController.getNoticeByNoticeId);
postRouter.get('/question/:postId', viewCount, postController.getQuestionByQuestionId);

module.exports = postRouter;