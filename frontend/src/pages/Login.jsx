import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext); 
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/'); 
        } catch (err) {
            console.error("Full Error Object:", err); 
            const errorMessage = err.response?.data?.message || err.message || 'Login failed';
            setError(errorMessage);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="w-96 bg-white p-8 border border-gray-300 rounded shadow-sm">
                <h1 className="text-3xl font-cursive text-center mb-8 font-bold">Instagram</h1>
                
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Phone number, username, or email"
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
                    <button
                        type="submit"
                        className="bg-blue-500 text-white text-sm font-semibold py-1.5 rounded hover:bg-blue-600 transition"
                    >
                        Log In
                    </button>
                </form>

                <div className="flex items-center my-4">
                    <div className="h-px bg-gray-300 flex-1"></div>
                    <span className="px-4 text-xs text-gray-500 font-semibold">OR</span>
                    <div className="h-px bg-gray-300 flex-1"></div>
                </div>

                <p className="text-center text-sm">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-500 font-semibold">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;