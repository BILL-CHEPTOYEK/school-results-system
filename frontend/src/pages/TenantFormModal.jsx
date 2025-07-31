import React from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';

export default function TenantFormModal({ show, onHide, form, onChange, onSubmit, submitting }) {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add School (Tenant)</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <h6>School Info</h6>
                            <Form.Group className="mb-2">
                                <Form.Label>School Name</Form.Label>
                                <Form.Control name="school_name" value={form.school_name} onChange={onChange} required />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>School Type</Form.Label>
                                <Form.Select name="school_type" value={form.school_type} onChange={onChange} required>
                                    <option value="">Select type</option>
                                    <option value="Primary">Primary</option>
                                    <option value="Secondary">Secondary</option>
                                    <option value="Tertiary">Tertiary</option>
                                    <option value="University">University</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>School Address</Form.Label>
                                <Form.Control name="school_address" value={form.school_address} onChange={onChange} required />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>School Phone</Form.Label>
                                <Form.Control name="school_phone" value={form.school_phone} onChange={onChange} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <h6>Admin Info</h6>
                            <Form.Group className="mb-2">
                                <Form.Label>Admin Name</Form.Label>
                                <Form.Control name="admin_name" value={form.admin_name} onChange={onChange} required />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Admin Email</Form.Label>
                                <Form.Control name="admin_email" type="email" value={form.admin_email} onChange={onChange} required />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Admin Phone</Form.Label>
                                <Form.Control name="admin_phone" value={form.admin_phone} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Admin Password</Form.Label>
                                <Form.Control name="admin_password" type="password" value={form.admin_password} onChange={onChange} required />
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide} disabled={submitting}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={submitting}>
                        {submitting ? <Spinner size="sm" /> : 'Add School'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
