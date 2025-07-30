// Sidebar.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaUserShield, FaChartLine, FaSchool, FaEnvelope } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="left-0 p-4 sidebar bg-l"  >
      <h4 className="p-4 mb-4 text-center " >Welcome, {user ? user.username : 'Guest'}</h4>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/dashboard" className="d-flex align-items-center">
          <FaChartLine className="me-2" /> Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/profile" className="d-flex align-items-center">
          <FaUserShield className="me-2" /> Profile
        </Nav.Link>
        <Nav.Link as={Link} to="/results" className="d-flex align-items-center">
          <FaSchool className="me-2" /> Results
        </Nav.Link>
        <Nav.Link as={Link} to="/contact" className="d-flex align-items-center">
          <HiOutlineMail className="me-2" /> Contact Us
        </Nav.Link>
      </Nav>
    </div>
  );
}