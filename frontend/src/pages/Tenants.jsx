import React, { useEffect, useState } from 'react';
import { Button, Table, Spinner } from 'react-bootstrap';
import TenantFormModal from './TenantFormModal';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function Tenants() {
    const [tenants, setTenants] = useState([]);
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
        fetchTenants();
    }, []);

    const fetchTenants = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/tenants/');
            setTenants(res.data);
        } catch (err) {
            toast.error('Failed to fetch tenants');
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
            await api.post('/api/tenants/', form);
            toast.success('Tenant created! Super admin will receive an email.');
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
            fetchTenants();
        } catch (err) {
            toast.error('Failed to create tenant');
        }
        setSubmitting(false);
    };

    return (
        <div className="container mt-4">
            <h2>Tenants (Schools)</h2>
            <p className="mb-3 text-muted">Register a new school and its superuser. The super admin will receive an email notification.</p>
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
            <h4>All Tenants</h4>
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
                        {Array.isArray(tenants) && tenants.length > 0 ? (
                            tenants.map(t => (
                                <tr key={t.id}>
                                    <td>{t.name || t.school_name}</td>
                                    <td>{t.type || t.school_type}</td>
                                    <td>{t.address || t.school_address}</td>
                                    <td>{t.phone || t.school_phone}</td>
                                    <td>{t.admin_name}</td>
                                    <td>{t.admin_email}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-muted">No tenants found.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </div>
    );
}
