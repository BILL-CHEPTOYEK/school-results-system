import react from 'react';
import { Nav } from 'react-bootstrap';
import { FaFileImport } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Results() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if user is logged in
  if (!user) {
    navigate('/login');
    return null; // Prevent rendering if not logged in
  }

  // Fetch results from the API
  const fetchResults = async () => {
    try {
      const response = await api.get(`/results/${user.id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching results:', error);
      return [];
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">Your Results</h2>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/results" className="d-flex align-items-center">
          <FaFileImport className="me-2" /> View Results
        </Nav.Link>
      </Nav>
      {/* Table of different classes */}
    </div>
  );
}

