import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaChartBar, FaUserGraduate, FaBook, FaAward } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Mock data
const performanceData = [
    { subject: 'Math', score: 85 },
    { subject: 'English', score: 78 },
    { subject: 'Science', score: 92 },
    { subject: 'History', score: 74 },
    { subject: 'Art', score: 88 },
];

const attendanceData = [
    { name: 'Present', value: 92 },
    { name: 'Absent', value: 8 },
];
const COLORS = ['#0d6efd', '#dc3545'];

export default function Dashboard({ onLogout }) {
    return (
        <Container fluid className="py-4 bg-light min-vh-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Welcome back!</h2>
                {onLogout && (
                    <button className="btn btn-outline-danger" onClick={onLogout}>
                        Logout
                    </button>
                )}
            </div>
            <Row className="mb-4 g-4">
                <Col md={3} sm={6}>
                    <Card className="shadow-sm border-0 text-center">
                        <Card.Body>
                            <FaUserGraduate size={32} className="text-primary mb-2" />
                            <Card.Title className="mb-0">Students</Card.Title>
                            <h3 className="fw-bold mt-2">1,250</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6}>
                    <Card className="shadow-sm border-0 text-center">
                        <Card.Body>
                            <FaBook size={32} className="text-success mb-2" />
                            <Card.Title className="mb-0">Subjects</Card.Title>
                            <h3 className="fw-bold mt-2">12</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6}>
                    <Card className="shadow-sm border-0 text-center">
                        <Card.Body>
                            <FaAward size={32} className="text-warning mb-2" />
                            <Card.Title className="mb-0">Top Score</Card.Title>
                            <h3 className="fw-bold mt-2">98%</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6}>
                    <Card className="shadow-sm border-0 text-center">
                        <Card.Body>
                            <FaChartBar size={32} className="text-info mb-2" />
                            <Card.Title className="mb-0">Avg. Performance</Card.Title>
                            <h3 className="fw-bold mt-2">83%</h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="g-4">
                <Col md={8}>
                    <Card className="shadow-sm border-0 h-100">
                        <Card.Body>
                            <Card.Title className="fw-semibold mb-3">Performance by Subject</Card.Title>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={performanceData}>
                                    <XAxis dataKey="subject" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="score" fill="#0d6efd" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm border-0 h-100">
                        <Card.Body>
                            <Card.Title className="fw-semibold mb-3">Attendance</Card.Title>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={attendanceData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {attendanceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
