const postRouter = require('express').Router();
const { viewCount } = require('../utils/viewCount');
const { imageUploader } = require('../utils/imageUploader');
const postController = require('../controllers/postController');

postRouter.get('', postController.getPostByPostName);
postRouter.post('', imageUploader.single('image'), postController.registerPostByAdminId);
postRouter.patch('/:postId',postController.updatePost);
postRouter.delete('/:postId', postController.deletePost);
postRouter.get('/:postId', viewCount, postController.getPostByPostId);

module.exports = postRouter;