import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginWrapper({ onLogin }) {
  const navigate = useNavigate();
  return <Login onLogin={(token) => {
    onLogin(token);
    toast.success('Login successful!');
    navigate('/dashboard');
  }} />;
}

function DashboardWrapper({ token, onLogout }) {
  return <Dashboard token={token} onLogout={onLogout} />;
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
        <Route path="/dashboard" element={token ? <DashboardWrapper token={token} onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
