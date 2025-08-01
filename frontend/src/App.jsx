import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, Outlet } from 'react-router-dom';
import Classes from './pages/Classes.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sidebar from './pages/Sidebar';
import CustomNavbar from './pages/Navbar';
import Results from './pages/Results'
import Students from './pages/Students';
import Tenants from './pages/Tenants';
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

const SIDEBAR_WIDTH = 210;
const NAVBAR_HEIGHT = 70;

function AuthLayout({ onLogout }) {
  return (
    <>
      <CustomNavbar />
      <div
        className="d-flex"
        style={{
          paddingTop: NAVBAR_HEIGHT,
        }}
      >
        <div style={{ width: SIDEBAR_WIDTH, position: 'fixed', top: NAVBAR_HEIGHT, left: 0, height: `calc(100vh - ${NAVBAR_HEIGHT}px)`, zIndex: 1030 }}>
          <Sidebar />
        </div>
        <div
          className="flex-grow-1"
          style={{
            minHeight: '100vh',
            paddingLeft: SIDEBAR_WIDTH,
            background: '#f8f9fa',
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
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
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/results" element={<Results />} />
            <Route path="/students" element={<Students />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}
