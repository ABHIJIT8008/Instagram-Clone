import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from '../utils/axios';

const EditProfile = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setBio(user.bio || ''); 
            setProfilePic(user.profilePic || '');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.put('/users/profile', {
                username,
                bio,
                profilePic
            });
            setUser(data);
            const updatedUserInfo = { ...data, token: localStorage.getItem('token') };
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

            navigate(`/profile/${user._id}`);
        } catch (error) {
            console.error("Update failed", error);
            alert("Failed to update profile");
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center mt-10 px-4">
            <div className="w-full max-w-md bg-white border p-8 rounded shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-center">Edit Profile</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Profile Picture URL</label>
                        <input 
                            type="text" 
                            className="w-full border p-2 rounded text-sm bg-gray-50"
                            value={profilePic}
                            onChange={(e) => setProfilePic(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input 
                            type="text" 
                            className="w-full border p-2 rounded text-sm bg-gray-50"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Bio</label>
                        <textarea 
                            className="w-full border p-2 rounded text-sm bg-gray-50"
                            rows="3"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-blue-500 text-white py-2 rounded font-semibold text-sm hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Submit'}
                    </button>
                    
                    <button 
                        type="button"
                        onClick={() => navigate(-1)}
                        className="text-gray-500 text-sm hover:underline text-center"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;