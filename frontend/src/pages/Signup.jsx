import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signup({ username, email, password });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create account');
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50 px-4">
            <div className="w-96 bg-white p-8 border border-gray-300 rounded shadow-sm">
                <h1 className="text-3xl font-cursive text-center mb-4 font-bold">Instagram</h1>
                <p className="text-center text-gray-500 font-semibold mb-6">
                    Sign up to see photos and videos from your friends.
                </p>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Username"
                        className="bg-gray-50 border border-gray-300 text-sm rounded px-3 py-2 outline-none focus:border-gray-400"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="bg-gray-50 border border-gray-300 text-sm rounded px-3 py-2 outline-none focus:border-gray-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-gray-50 border border-gray-300 text-sm rounded px-3 py-2 outline-none focus:border-gray-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <p className="text-xs text-gray-500 text-center my-2">
                        People who use our service may have uploaded your contact information to Instagram.
                    </p>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white text-sm font-semibold py-1.5 rounded hover:bg-blue-600 transition disabled:opacity-50"
                    >
                        {loading ? 'Signing up...' : 'Sign up'}
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="h-px bg-gray-300 flex-1"></div>
                    <span className="px-4 text-xs text-gray-500 font-semibold">OR</span>
                    <div className="h-px bg-gray-300 flex-1"></div>
                </div>

                <p className="text-center text-sm">
                    Have an account?{' '}
                    <Link to="/login" className="text-blue-500 font-semibold">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;