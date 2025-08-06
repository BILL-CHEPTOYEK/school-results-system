import { useState } from 'react';
import api from '../services/api';
import { FaUser, FaLock, FaArrowRight, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';

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
            const data = await api.post('/api/auth/token/', { username, password });
            console.log('Login API response:', data);
            if (data.access) {
                onLogin(data.access);
            } else {
                setError(data.detail || 'Login failed (no access token)');
            }
        } catch (err) {
            console.log('Login error:', err);
            setError(err.detail || 'Network error');
        }
        setLoading(false);
    };


    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light position-relative" style={{
            backgroundImage: "url('/assets/login.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
        }}>
            <div className="top-0 position-absolute start-0 w-100 h-100" style={{ background: 'rgba(30, 58, 138, 0.5)', backdropFilter: 'blur(2px)' }}></div>
            <div className="position-relative z-1 w-100" style={{ maxWidth: 400 }}>
                <div className="p-4 bg-white border-0 shadow-lg card rounded-4 p-md-5 bg-opacity-95">
                    <div className="mb-4 text-center">
                        <div className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle" style={{ width: 60, height: 60 }}>
                            <FaUser size={32} className="text-primary" />
                        </div>
                        <h2 className="mb-1 fw-bold">Sign in</h2>
                        <p className="mb-0 text-muted">Access your results portal</p>
                    </div>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        {error && <div className="py-2 mb-3 text-center alert alert-danger">{error}</div>}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Username</label>
                            <div className="input-group">
                                <span className="bg-white input-group-text"><FaUser className="text-secondary" /></span>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Password</label>
                            <div className="input-group">
                                <span className="bg-white input-group-text"><FaLock className="text-secondary" /></span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary border-start-0 rounded-end"
                                    tabIndex={-1}
                                    onClick={() => setShowPassword(prev => !prev)}
                                    style={{ borderLeft: 'none' }}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <div className="mb-3 d-flex justify-content-end">
                            <a href="#" className="text-primary text-decoration-none small">Forgot password?</a>
                        </div>
                        <button
                            type="submit"
                            className="gap-2 btn btn-primary w-100 d-flex align-items-center justify-content-center fw-semibold"
                            disabled={loading}
                        >
                            {loading ? (
                                <FaSpinner className="me-2 spinner-border spinner-border-sm" />
                            ) : (
                                <FaArrowRight className="me-2" />
                            )}
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <small className="text-muted">&copy; {new Date().getFullYear()} Your School Name. All rights reserved.</small>
                    </div>
                </div>
            </div>
        </div>
    );
}
// login.jsx