const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Follow = require('../models/Follow');

const createPost = async (req, res) => {
    try {
        const { imageUrl, caption } = req.body;

        const post = await Post.create({
            user: req.user._id, 
            imageUrl,
            caption,
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.likes.includes(req.user._id)) {
            return res.status(400).json({ message: 'Post already liked' });
        }

        post.likes.push(req.user._id);
        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.likes = post.likes.filter(
            (like) => like.toString() !== req.user._id.toString()
        );

        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = await Comment.create({
            post: req.params.id,
            user: req.user._id,
            text,
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await post.deleteOne();
        res.json({ message: 'Post removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getFeedPosts = async (req, res) => {
    try {
        
        const followingDocs = await Follow.find({ follower: req.user._id });
        
        const followingIds = followingDocs.map(doc => doc.following);

        followingIds.push(req.user._id); 

        const posts = await Post.find({ user: { $in: followingIds } })
            .sort({ createdAt: -1 }) 
            .populate('user', 'username profilePic');

        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getPostComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.id })
            .sort({ createdAt: -1 }) // Newest first
            .populate('user', 'username profilePic'); // Show who wrote it

        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createPost,
    likePost,
    unlikePost,
    commentOnPost,
    deletePost,
    getFeedPosts,
    getPostComments,
};