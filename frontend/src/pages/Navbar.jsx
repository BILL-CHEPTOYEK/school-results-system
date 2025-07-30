// File: src/pages/Navbar.jsx
import React from 'react';
import { Navbar as BSNavbar, Nav } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function CustomNavbar() {
    const navigate = useNavigate();
    // Check if user is logged in
    const isLoggedIn = !!localStorage.getItem('token');
    // If not logged in, redirect to login page
    if (!isLoggedIn) {
        navigate('/login');
        return null; 
    }

    // Handle logout
    const onLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };
    // If logged in, render the Navbar
    return (
        <BSNavbar bg="white" expand="md" className="py-2 shadow-sm" fixed='top'>
            <BSNavbar.Brand href="/">
                <img src="/assets/login.jpg" width="40" height="40" className="border rounded-circle me-2 border-primary" alt="School Logo" />
                <span className="fw-bold fs-4 text-primary">School Results System</span>
            </BSNavbar.Brand>
            <Nav className="ms-auto">
                <button className="btn btn-primary" onClick={onLogout}>
                    <FaSignInAlt className="me-2" /> Logout
                </button>
            </Nav>
        </BSNavbar>
    );
}