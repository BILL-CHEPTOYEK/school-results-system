import { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok && data.access) {
        onLogin(data.access);
      } else {
        setError(data.detail || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <img src="/vite.svg" alt="School Logo" className="w-20 h-20 mb-4" />
        <h1 className="text-3xl font-extrabold text-blue-700 mb-2 text-center tracking-tight">School Results Portal</h1>
        <p className="text-gray-600 mb-6 text-center">Sign in to access your results and school reports</p>
        <form onSubmit={handleSubmit} className="w-full">
          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full mb-6 px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-xs text-gray-400 text-center">&copy; {new Date().getFullYear()} Your School Name</div>
      </div>
    </div>
  );
}
