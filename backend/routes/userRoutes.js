const express = require('express');
const router = express.Router();
const { getUserProfile, followUser, unfollowUser, searchUsers, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/search', protect, searchUsers);
router.put('/profile', protect, updateUserProfile);
router.get('/:id', protect, getUserProfile);

router.post('/follow/:id', protect, followUser);
router.post('/unfollow/:id', protect, unfollowUser);

module.exports = router;