const User = require("../models/User");
const Post = require("../models/Post");
const Follow = require("../models/Follow");

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isFollowing = await Follow.findOne({
            follower: req.user._id,
            following: req.params.id
        });

        const [posts, followersCount, followingCount] = await Promise.all([
            Post.find({ user: req.params.id }).sort({ createdAt: -1 }),
            Follow.countDocuments({ following: req.params.id }),
            Follow.countDocuments({ follower: req.params.id })
        ]);

        res.json({
            ...user.toObject(),
            posts,
            followersCount,
            followingCount,
            isFollowing: !!isFollowing 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const followUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user._id;

    if (targetUserId === currentUserId.toString()) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingFollow = await Follow.findOne({
      follower: currentUserId,
      following: targetUserId,
    });

    if (existingFollow) {
      return res
        .status(400)
        .json({ message: "You are already following this user" });
    }

    await Follow.create({
      follower: currentUserId,
      following: targetUserId,
    });

    res.json({ message: "User followed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user._id;

    const deleted = await Follow.findOneAndDelete({
      follower: currentUserId,
      following: targetUserId,
    });

    if (!deleted) {
      return res
        .status(400)
        .json({ message: "You are not following this user" });
    }

    res.json({ message: "User unfollowed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const searchUsers = async (req, res) => {
    try {
        const { query } = req.query; 
        if (!query) {
            return res.json([]);
        }
        const users = await User.find({
            username: { $regex: query, $options: 'i' }
        }).select('username profilePic _id');

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            user.bio = req.body.bio || user.bio;
            user.profilePic = req.body.profilePic || user.profilePic;

            if (req.body.password) {
                user.password = req.body.password;
            }
            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                profilePic: updatedUser.profilePic,
                bio: updatedUser.bio,
                token: req.body.token,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getUserProfile, followUser, unfollowUser ,searchUsers, updateUserProfile };
