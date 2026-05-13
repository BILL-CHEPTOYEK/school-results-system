import React from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';

export default function TenantFormModal({ show, onHide, form, onChange, onSubmit, submitting, isEdit = false }) {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{isEdit ? 'Edit School' : 'Add School'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>School Name</Form.Label>
                        <Form.Control
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            required
                            placeholder="Enter school name"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>School Email</Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={onChange}
                            required
                            placeholder="Enter school email for login"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={onChange}
                            required={!isEdit}
                            placeholder={isEdit ? "Leave blank to keep current password" : "Enter password"}
                        />
                        {isEdit && (
                            <Form.Text className="text-muted">
                                Leave blank to keep the current password
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            name="address"
                            value={form.address}
                            onChange={onChange}
                            placeholder="Enter school address"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            name="phone"
                            value={form.phone}
                            onChange={onChange}
                            placeholder="Enter school phone number"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide} disabled={submitting}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={submitting}>
                        {submitting ? <Spinner size="sm" /> : (isEdit ? 'Update School' : 'Add School')}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
