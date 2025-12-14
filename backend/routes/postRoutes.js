const express = require('express');
const router = express.Router();
const {
    createPost,
    likePost,
    unlikePost,
    commentOnPost,
    getFeedPosts,
    deletePost,
    getPostComments,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createPost);
router.get('/feed', protect, getFeedPosts);
router.delete('/:id', protect, deletePost);

router.put('/:id/like', protect, likePost);
router.put('/:id/unlike', protect, unlikePost);
router.post('/:id/comment', protect, commentOnPost);
router.get('/:id/comments', protect, getPostComments);

module.exports = router;