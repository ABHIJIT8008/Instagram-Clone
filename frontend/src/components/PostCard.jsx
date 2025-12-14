import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaRegComment, FaPaperPlane } from 'react-icons/fa';
import axios from '../utils/axios';
import AuthContext from '../context/AuthContext';

const PostCard = ({ post }) => {
    const { user } = useContext(AuthContext);
    // Like State
    const [likes, setLikes] = useState(post.likes);
    const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));

    // Comment State
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loadingComments, setLoadingComments] = useState(false);

    const handleLike = async () => {
        const previousLikes = [...likes];
        const previousIsLiked = isLiked;
        if (isLiked) {
            setIsLiked(false);
            setLikes(likes.filter(id => id !== user._id));
        } else {
            setIsLiked(true);
            setLikes([...likes, user._id]);
        }
        try {
            if (isLiked) {
                await axios.put(`/posts/${post._id}/unlike`);
            } else {
                await axios.put(`/posts/${post._id}/like`);
            }
        } catch (error) {
            setIsLiked(previousIsLiked);
            setLikes(previousLikes);
        }
    };

    const toggleComments = async () => {
        if (!showComments) {
            setLoadingComments(true);
            try {
                const { data } = await axios.get(`/posts/${post._id}/comments`);
                setComments(data);
            } catch (error) {
                console.error("Failed to fetch comments");
            }
            setLoadingComments(false);
        }
        setShowComments(!showComments);
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const { data } = await axios.post(`/posts/${post._id}/comment`, { text: newComment });
            
            const commentToAdd = {
                ...data,
                user: { username: user.username, profilePic: user.profilePic }
            };

            setComments([commentToAdd, ...comments]);
            setNewComment('');
        } catch (error) {
            console.error("Failed to post comment");
        }
    };

    return (
        <div className="bg-white border rounded-sm mb-4 max-w-[470px] w-full mx-auto shadow-sm">
            <div className="flex items-center p-3">
                <img 
                    src={post.user?.profilePic || 'https://via.placeholder.com/150'} 
                    alt="avatar" 
                    className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <Link to={`/profile/${post.user?._id}`} className="font-semibold text-sm hover:underline">
                    {post.user?.username}
                </Link>
            </div>
            <img src={post.imageUrl} alt="post" className="w-full object-cover" />
            <div className="p-3">
                <div className="flex gap-4 mb-2 text-2xl">
                    <button onClick={handleLike} className="focus:outline-none transition-transform active:scale-125">
                        {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-700 hover:text-gray-400" />}
                    </button>
                    <button onClick={toggleComments} className="focus:outline-none hover:text-gray-500">
                        <FaRegComment className="text-gray-700" />
                    </button>
                </div>

                <p className="font-semibold text-sm mb-1">{likes.length} likes</p>

                <div className="mb-2">
                    <span className="font-semibold text-sm mr-2">{post.user?.username}</span>
                    <span className="text-sm">{post.caption}</span>
                </div>
                
                <p className="text-xs text-gray-500 uppercase mb-2">
                    {new Date(post.createdAt).toLocaleDateString()}
                </p>

                {showComments && (
                    <div className="border-t pt-2 mt-2">
                        <form onSubmit={handleAddComment} className="flex items-center gap-2 mb-3">
                            <input 
                                type="text"
                                placeholder="Add a comment..."
                                className="flex-1 text-sm border-none focus:ring-0 outline-none"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button 
                                type="submit" 
                                disabled={!newComment.trim()}
                                className="text-blue-500 text-sm font-semibold disabled:opacity-50"
                            >
                                Post
                            </button>
                        </form>
                        <div className="max-h-40 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                            {loadingComments ? (
                                <p className="text-xs text-gray-400 text-center">Loading...</p>
                            ) : comments.length > 0 ? (
                                comments.map((comment) => (
                                    <div key={comment._id} className="flex items-start gap-2 text-sm">
                                        <span className="font-semibold whitespace-nowrap">{comment.user?.username}</span>
                                        <span className="text-gray-700 break-words">{comment.text}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400">No comments yet.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostCard;