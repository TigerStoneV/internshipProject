const postRouter = require('express').Router();
const { viewCount } = require('../utils/viewCount');
const { imageUploader } = require('../utils/imageUploader');
const postController = require('../controllers/postController');

postRouter.get('/news', postController.getNewsAll);
postRouter.get('/notice', postController.getNoticeAll);
postRouter.get('/question', postController.getQuestionAll)
postRouter.post('/news', imageUploader.single('image'), postController.postNewsByAdminId);
postRouter.post('/notice', postController.postNoticeByAdminId);
postRouter.post('/question', postController.postQuestionByAdminId);
postRouter.patch('/news/:newsId',postController.updateNews);
postRouter.patch('/notice/:noticeId',postController.updateNotice);
postRouter.patch('/question/:questionId',postController.updateQuestion);
postRouter.delete('/news/:newsId', postController.deleteNews);
postRouter.delete('/notice/:noticeId', postController.deleteNotice);
postRouter.delete('/question/:questionId', postController.deleteQuestion);
postRouter.get('/news/:postId', viewCount, postController.getNewsByNewsId);
postRouter.get('/notice/:postId', viewCount, postController.getNoticeByNoticeId);
postRouter.get('/question/:questionId', viewCount, postController.getQuestionByQuestionId);

module.exports = postRouter;