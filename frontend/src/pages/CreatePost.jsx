import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const CreatePost = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/posts', { imageUrl, caption });
            navigate('/');
        } catch (err) {
            setError('Failed to create post. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-md bg-white border border-gray-300 p-6 rounded shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-center">Create New Post</h2>
                
                {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input 
                            type="text" 
                            placeholder="https://..." 
                            className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-blue-500"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                        />
                    </div>

                    {imageUrl && (
                        <div className="w-full h-64 bg-gray-100 rounded overflow-hidden flex items-center justify-center border">
                            <img 
                                src={imageUrl} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null; 
                                    e.target.src = "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                                }} 
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                        <textarea 
                            placeholder="Write a caption..." 
                            className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-blue-500"
                            rows="3"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`bg-blue-500 text-white font-semibold py-2 rounded text-sm ${loading ? 'opacity-50' : 'hover:bg-blue-600'}`}
                    >
                        {loading ? 'Sharing...' : 'Share'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;