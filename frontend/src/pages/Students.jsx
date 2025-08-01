import React, { useEffect, useState } from "react";
import { Nav, Form, Button, Table, Spinner, Alert } from "react-bootstrap";
import { FaUserGraduate, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Students() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showAdd, setShowAdd] = useState(false);
    const [newStudent, setNewStudent] = useState({ name: "", class_id: "" });
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        // Fetch classes/categories
        api.get("/classes/")
            .then(data => setClasses(data))
            .catch(() => setClasses([]));
    }, [user, navigate]);

    useEffect(() => {
        if (selectedClass) {
            setLoading(true);
            api.get(`/students/class/${selectedClass}`)
                .then(data => setStudents(data))
                .catch(() => setStudents([]))
                .finally(() => setLoading(false));
        } else {
            setStudents([]);
        }
    }, [selectedClass]);

    const handleAddStudent = async (e) => {
        e.preventDefault();
        setAdding(true);
        setError("");
        try {
            await api.post("/students/", { ...newStudent, class_id: selectedClass });
            setShowAdd(false);
            setNewStudent({ name: "", class_id: "" });
            // Refresh students
            api.get(`/students/class/${selectedClass}`).then(data => setStudents(data));
        } catch (err) {
            setError("Failed to add student.");
        }
        setAdding(false);
    };

    return (
        <div className="p-4">
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <h2>Your Students</h2>
                <Button variant="success" onClick={() => setShowAdd(v => !v)}>
                    <FaPlus className="me-2" /> Add Student
                </Button>
            </div>
            <Form.Group className="mb-4" controlId="classSelect">
                <Form.Label>Select Class/course</Form.Label>
                <Form.Select
                    value={selectedClass}
                    onChange={e => setSelectedClass(e.target.value)}
                >
                    <option value="">-- Choose a class/c --</option>
                    {classes.map(cls => (
                        <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            {showAdd && (
                <Form onSubmit={handleAddStudent} className="p-3 mb-4 border rounded bg-light">
                    <Form.Group className="mb-2">
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={newStudent.name}
                            onChange={e => setNewStudent(s => ({ ...s, name: e.target.value }))}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" disabled={adding}>
                        {adding ? <Spinner size="sm" animation="border" /> : "Add Student"}
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
                            <th>Class</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr><td colSpan={3} className="text-center">No students found.</td></tr>
                        ) : (
                            students.map((student, idx) => (
                                <tr key={student.id}>
                                    <td>{idx + 1}</td>
                                    <td>{student.name}</td>
                                    <td>{student.class_name || ''}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            )}
        </div>
    );
}