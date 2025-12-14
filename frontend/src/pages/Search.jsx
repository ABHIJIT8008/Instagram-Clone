import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchUsers = async () => {
            if (!query.trim()) {
                setUsers([]);
                return;
            }

            setLoading(true);
            try {
                const { data } = await axios.get(`/users/search?query=${query}`);
                setUsers(data);
            } catch (error) {
                console.error("Search failed", error);
            }
            setLoading(false);
        };
        const timeoutId = setTimeout(() => {
            fetchUsers();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <div className="flex justify-center mt-8 px-4">
            <div className="w-full max-w-md">
                <div className="relative mb-6">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search users..." 
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-gray-50"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                </div>
                <div className="bg-white rounded shadow-sm border border-gray-200">
                    {loading && <p className="p-4 text-center text-gray-500">Searching...</p>}
                    
                    {!loading && users.length === 0 && query && (
                        <p className="p-4 text-center text-gray-500">No users found.</p>
                    )}
                    {users.map((user) => (
                        <Link 
                            to={`/profile/${user._id}`} 
                            key={user._id}
                            className="flex items-center p-3 hover:bg-gray-50 border-b last:border-b-0 transition"
                        >
                            <img 
                                src={user.profilePic || 'https://via.placeholder.com/150'} 
                                alt={user.username} 
                                className="w-10 h-10 rounded-full object-cover mr-3"
                            />
                            <div>
                                <p className="font-semibold text-sm">{user.username}</p>
                                <p className="text-xs text-gray-500">User</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;