import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sidebar from './pages/Sidebar';
import Navbar from './pages/Navbar';
import Results from './pages/Results'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Example Profile page
function Profile() {
  return <div className="p-5 m-4"><h2>Profile</h2><p>This is your profile page.</p></div>;
}

function LoginWrapper({ onLogin }) {
  const navigate = useNavigate();
  return <Login onLogin={(token) => {
    onLogin(token);
    toast.success('Login successful!');
    navigate('/dashboard');
  }} />;
}

function AuthLayout({ onLogout }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar onLogout={onLogout} />
        {/* Main content area */}
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    toast.info('Logged out');
  };

  return (
    <Router>
      <ToastContainer position="top-center" autoClose={2000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginWrapper onLogin={setToken} />} />
        {token ? (
          <Route element={<AuthLayout onLogout={handleLogout} />}>
            <Route path="/dashboard" element={<Dashboard token={token} />} />
            <Route path="/profile" element={<Profile />} />
            {/* Add more authenticated routes here */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
            <Route path="/results" element={<Results/>} />
      </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}
