// Sidebar.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaUserShield, FaChartLine, FaSchool } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <aside
            className="top-0 bg-white shadow-sm sidebar border-end rounded-end d-flex flex-column align-items-center position-fixed"
            style={{
                minHeight: '100vh',
                width: 210,
                zIndex: 1030,
                left: 0,
                paddingTop: 70, // to account for fixed navbar height
                overflowY: 'auto',
                height: '100vh'
            }}
        >
            <h5 className="mb-4 text-center fw-bold text-primary letter-spacing-1" style={{ letterSpacing: 1 }}>
                Welcome, {user ? user.username : 'Guest'}
            </h5>
            <Nav className="gap-2 flex-column w-100">
                <Nav.Link
                    as={NavLink}
                    to="/dashboard"
                    className={({ isActive }) =>
                        `d-flex align-items-center px-3 py-2 rounded transition${isActive ? ' bg-primary text-white fw-bold shadow-sm' : ' text-secondary'}`
                    }
                >
                    <FaChartLine className="me-2" /> Dashboard
                </Nav.Link>
                <Nav.Link
                    as={NavLink}
                    to="/profile"
                    className={({ isActive }) =>
                        `d-flex align-items-center px-3 py-2 rounded transition${isActive ? ' bg-primary text-white fw-bold shadow-sm' : ' text-secondary'}`
                    }
                >
                    <FaUserShield className="me-2" /> Profile
                </Nav.Link>
                <Nav.Link
                    as={NavLink}
                    to="/results"
                    className={({ isActive }) =>
                        `d-flex align-items-center px-3 py-2 rounded transition${isActive ? ' bg-primary text-white fw-bold shadow-sm' : ' text-secondary'}`
                    }
                >
                    <FaSchool className="me-2" /> Results
                </Nav.Link>
                <Nav.Link
                    as={NavLink}
                    to="/contact"
                    className={({ isActive }) =>
                        `d-flex align-items-center px-3 py-2 rounded transition${isActive ? ' bg-primary text-white fw-bold shadow-sm' : ' text-secondary'}`
                    }
                >
                    <HiOutlineMail className="me-2" /> Contact Us
                </Nav.Link>
            </Nav>
        </aside>
    );
}