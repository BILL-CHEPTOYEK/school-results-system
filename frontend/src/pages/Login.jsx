import { useState } from 'react';
import api from '../services/api';

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await api.post('/api/auth/login/', { username, password });
            if (data.access) {
                onLogin(data.access);
            } else {
                setError(data.detail || 'Login failed');
            }
        } catch (err) {
            setError(err.detail || 'Network error');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative" style={{
            backgroundImage: "url('/assets/login.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
        }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-800/40 to-blue-700/60 backdrop-blur-[2px]" />
            <div className="relative z-10 w-full flex items-center justify-center min-h-screen p-4">
                <div className="flex flex-col lg:flex-row w-full max-w-4xl overflow-hidden bg-white shadow-2xl rounded-2xl">
                    {/* Left: Branding */}
                    <div className="hidden lg:flex flex-col justify-center w-full lg:w-1/2 bg-gradient-to-br from-blue-600/85 to-blue-900/95 p-8 relative">
                        <div className="absolute inset-0">
                            <img src="/src/assets/login.jpg" alt="School" className="object-cover w-full h-full opacity-30" />
                            <img src="/assets/login.jpg" alt="School" className="object-cover w-full h-full opacity-30" />
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-700/60" />
                        </div>
                        <div className="relative z-10 p-8">
                            <h1 className="mb-4 text-4xl font-extrabold leading-tight text-white drop-shadow-lg">
                                Welcome to <span className="text-blue-200">Your School</span>
                            </h1>
                            <div className="w-16 h-1 bg-blue-300 rounded-full mb-4" />
                            <p className="text-lg opacity-90 mb-6 text-white">
                                Access your results, reports, and more
                            </p>
                        </div>
                    </div>
                    {/* Right: Login Form */}
                    <div className="flex flex-col justify-center w-full p-8 lg:w-1/2 lg:p-12 bg-white/95">
                        <div className="w-full max-w-md mx-auto">
                            <div className="mb-8 text-center">
                                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                                    {/* School SVG icon */}
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 0l7 5v7a2 2 0 01-2 2H7a2 2 0 01-2-2V10l7-5zm0 0L5 10m7-5l7 5" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">School Results Portal</h2>
                                <p className="mt-2 text-sm text-gray-600">Sign in to access your dashboard</p>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter your username"
                                            required
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            {/* User SVG icon */}
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            {/* Lock SVG icon */}
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(prev => !prev)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            {showPassword ? (
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.175-6.125M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.125-2.175A9.96 9.96 0 0122 9c0 5.523-4.477 10-10 10a10.05 10.05 0 01-1.875-.175" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.25 2.25l3.75 3.75M6.75 6.75l-3.75-3.75" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Remember me</span>
                                    </label>
                                    <a href="#" className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium">Forgot password?</a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    )}
                                    {loading ? 'Signing in...' : 'Sign In'}
                                </button>
                            </form>
                            <div className="mt-8 text-center">
                                <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Your School Name. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
