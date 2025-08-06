import React, { useEffect, useState } from 'react';
import { Button, Table, Spinner } from 'react-bootstrap';
import TenantFormModal from './TenantFormModal';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function Schools() {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        school_name: '',
        school_type: '',
        school_address: '',
        school_phone: '',
        admin_name: '',
        admin_email: '',
        admin_phone: '',
        admin_password: ''
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
            // Accept both array and object with data property
            if (Array.isArray(res)) {
                setSchools(res);
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

    const handleSubmit = async e => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.post('/api/schools/', form);
            toast.success('School created successfully!');
            setForm({
                school_name: '',
                school_type: '',
                school_address: '',
                school_phone: '',
                admin_name: '',
                admin_email: '',
                admin_phone: '',
                admin_password: ''
            });
            setShowModal(false);
            fetchSchools();
        } catch (err) {
            toast.error('Failed to create school');
        }
        setSubmitting(false);
    };

    return (
        <div className="container mt-4">
            <h2>Schools</h2>
            <p className="mb-3 text-muted">Register a new school and its admin. Only superusers can create schools.</p>
            <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
                Add School
            </Button>
            <TenantFormModal
                show={showModal}
                onHide={() => setShowModal(false)}
                form={form}
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitting={submitting}
            />
            <h4>All Schools</h4>
            {loading ? <Spinner /> : (
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Admin Name</th>
                            <th>Admin Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(schools) && schools.length > 0 ? (
                            schools.map(s => (
                                <tr key={s.id}>
                                    <td>{s.name || s.school_name || ''}</td>
                                    <td>{s.school_type || s.type || ''}</td>
                                    <td>{s.school_address || s.address || ''}</td>
                                    <td>{s.school_phone || s.phone || ''}</td>
                                    <td>{s.admin_name || ''}</td>
                                    <td>{s.admin_email || ''}</td>
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
