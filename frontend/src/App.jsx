import { useState } from 'react';
import Login from './pages/Login';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleLogin = (jwt) => {
    setToken(jwt);
    localStorage.setItem('token', jwt);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Welcome</h1>
        <p className="mb-6">You are logged in.</p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default App;
