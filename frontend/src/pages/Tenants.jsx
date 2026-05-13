import React, { useEffect, useState } from 'react';
import { Button, Table, Spinner } from 'react-bootstrap';
import TenantFormModal from './TenantFormModal';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function Schools() {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        phone: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchSchools();
    }, []);

    const fetchSchools = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/schools/');
            console.log('Fetched schools:', res);
            // Handle paginated response from Django REST Framework
            if (Array.isArray(res)) {
                setSchools(res);
            } else if (Array.isArray(res.results)) {
                setSchools(res.results); // DRF pagination format
            } else if (Array.isArray(res.data)) {
                setSchools(res.data);
            } else {
                setSchools([]);
            }
        } catch (err) {
            toast.error('Failed to fetch schools');
        }
        setLoading(false);
    };

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEdit = (school) => {
        setForm({
            id: school.id,
            name: school.name || '',
            email: school.email || '',
            password: '', // Don't populate password for security
            address: school.address || '',
            phone: school.phone || ''
        });
        setShowModal(true);
    };

    const handleSuspend = async (schoolId, currentStatus) => {
        try {
            await api.patch(`/api/schools/${schoolId}/`, {
                is_active: !currentStatus
            });
            toast.success(`School ${!currentStatus ? 'activated' : 'suspended'} successfully!`);
            fetchSchools();
        } catch (err) {
            toast.error('Failed to update school status');
        }
    };

    const handleViewDetails = (school) => {
        // For now, show an alert with school details
        // Later this can navigate to a detailed view page
        alert(`School Details:\n\nName: ${school.name}\nEmail: ${school.email}\nAddress: ${school.address}\nPhone: ${school.phone}\nStatus: ${school.is_active ? 'Active' : 'Suspended'}\nCreated: ${new Date(school.created_at).toLocaleDateString()}`);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (form.id) {
                // Update existing school
                const updateData = { ...form };
                if (!updateData.password) {
                    delete updateData.password; // Don't update password if empty
                }
                delete updateData.id;
                await api.patch(`/api/schools/${form.id}/`, updateData);
                toast.success('School updated successfully!');
            } else {
                // Create new school
                await api.post('/api/schools/', form);
                toast.success('School created successfully!');
            }
            setForm({
                name: '',
                email: '',
                password: '',
                address: '',
                phone: ''
            });
            setShowModal(false);
            fetchSchools();
        } catch (err) {
            toast.error(`Failed to ${form.id ? 'update' : 'create'} school`);
        }
        setSubmitting(false);
    };

    return (
        <div className="container mt-4">
            <h2>Schools</h2>
            <p className="mb-3 text-muted">Manage schools in the system. Add new schools with email/password authentication.</p>
            <Button variant="primary" className="mb-3" onClick={() => {
                setForm({
                    name: '',
                    email: '',
                    password: '',
                    address: '',
                    phone: ''
                });
                setShowModal(true);
            }}>
                Add School
            </Button>
            <TenantFormModal
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                    setForm({
                        name: '',
                        email: '',
                        password: '',
                        address: '',
                        phone: ''
                    });
                }}
                form={form}
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitting={submitting}
                isEdit={!!form.id}
            />
            <h4>All Schools</h4>
            {loading ? <Spinner /> : (
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(schools) && schools.length > 0 ? (
                            schools.map(s => (
                                <tr key={s.id}>
                                    <td>{s.name || ''}</td>
                                    <td>{s.email || ''}</td>
                                    <td>{s.phone || ''}</td>
                                    <td>{s.address || ''}</td>
                                    <td>
                                        <span className={`badge ${s.is_active ? 'bg-success' : 'bg-danger'}`}>
                                            {s.is_active ? 'Active' : 'Suspended'}
                                        </span>
                                    </td>
                                    <td>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleEdit(s)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant={s.is_active ? "outline-warning" : "outline-success"}
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleSuspend(s.id, s.is_active)}
                                        >
                                            {s.is_active ? 'Suspend' : 'Activate'}
                                        </Button>
                                        <Button
                                            variant="outline-info"
                                            size="sm"
                                            onClick={() => handleViewDetails(s)}
                                        >
                                            View Details
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-muted">No schools found.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </div>
    );
}
