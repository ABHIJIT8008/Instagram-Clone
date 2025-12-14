import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import PostCard from '../components/PostCard';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const { data } = await axios.get('/posts/feed');
                setPosts(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching feed:", err);
                setError("Could not load feed.");
                setLoading(false);
            }
        };

        fetchFeed();
    }, []);

    if (loading) return <div className="text-center mt-10">Loading Feed...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

    return (
        <div className="flex flex-col items-center pt-8 bg-gray-50 min-h-screen">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))
            ) : (
                <div className="text-center mt-10">
                    <h2 className="text-xl font-bold mb-2">Welcome to Instagram!</h2>
                    <p className="text-gray-600">Follow users to see their posts here.</p>
                </div>
            )}
        </div>
    );
};

export default Home;