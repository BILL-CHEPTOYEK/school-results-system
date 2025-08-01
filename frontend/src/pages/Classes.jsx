import React, { useEffect, useState } from "react";
import { Form, Button, Table, Spinner, Alert } from "react-bootstrap";
import api from "../services/api";

export default function Classes() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showAdd, setShowAdd] = useState(false);
    const [newClass, setNewClass] = useState({ name: "" });
    const [adding, setAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editClass, setEditClass] = useState({ name: "" });

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = () => {
        setLoading(true);
        api.get("/api/classes/")
            .then(data => setClasses(data))
            .catch(() => setClasses([]))
            .finally(() => setLoading(false));
    };

    const handleAddClass = async (e) => {
        e.preventDefault();
        setAdding(true);
        setError("");
        try {
            await api.post("/api/classes/", newClass);
            setShowAdd(false);
            setNewClass({ name: "" });
            fetchClasses();
        } catch (err) {
            setError("Failed to add class.");
        }
        setAdding(false);
    };

    const handleEditClass = (cls) => {
        setEditingId(cls.id);
        setEditClass({ name: cls.name });
        setError("");
    };

    const handleUpdateClass = async (e) => {
        e.preventDefault();
        setAdding(true);
        setError("");
        try {
            await api.put(`/api/classes/${editingId}/`, editClass);
            setEditingId(null);
            setEditClass({ name: "" });
            fetchClasses();
        } catch (err) {
            setError("Failed to update class.");
        }
        setAdding(false);
    };

    const handleDeleteClass = async (id) => {
        if (!window.confirm("Are you sure you want to delete this class?")) return;
        setAdding(true);
        setError("");
        try {
            await api.delete(`/api/classes/${id}/`);
            fetchClasses();
        } catch (err) {
            setError("Failed to delete class.");
        }
        setAdding(false);
    };

    return (
        <div className="p-4">
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <h2>Classes / Years</h2>
                <Button variant="success" onClick={() => setShowAdd(v => !v)}>
                    Add Class/Year
                </Button>
            </div>
            {showAdd && (
                <Form onSubmit={handleAddClass} className="p-3 mb-4 border rounded bg-light">
                    <Form.Group className="mb-2">
                        <Form.Label>Class/Year Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={newClass.name}
                            onChange={e => setNewClass(s => ({ ...s, name: e.target.value }))}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" disabled={adding}>
                        {adding ? <Spinner size="sm" animation="border" /> : "Add Class/Year"}
                    </Button>
                    {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
                </Form>
            )}
            {loading ? (
                <div className="my-4 text-center"><Spinner animation="border" /></div>
            ) : (
                <Table striped bordered hover responsive className="bg-white">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.length === 0 ? (
                            <tr><td colSpan={3} className="text-center">No classes found.</td></tr>
                        ) : (
                            classes.map((cls, idx) => (
                                <tr key={cls.id}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        {editingId === cls.id ? (
                                            <Form onSubmit={handleUpdateClass} className="d-flex align-items-center">
                                                <Form.Control
                                                    type="text"
                                                    value={editClass.name}
                                                    onChange={e => setEditClass(s => ({ ...s, name: e.target.value }))}
                                                    required
                                                    size="sm"
                                                    className="me-2"
                                                />
                                                <Button type="submit" variant="primary" size="sm" disabled={adding}>
                                                    Save
                                                </Button>
                                                <Button variant="secondary" size="sm" className="ms-2" onClick={() => setEditingId(null)}>
                                                    Cancel
                                                </Button>
                                            </Form>
                                        ) : (
                                            cls.name
                                        )}
                                    </td>
                                    <td>
                                        {editingId !== cls.id && (
                                            <>
                                                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEditClass(cls)}>
                                                    Edit
                                                </Button>
                                                <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClass(cls.id)}>
                                                    Delete
                                                </Button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            )}
        </div>
    );
}
