import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Navbar, Nav, Container, Card, Button, Row, Col, Image } from 'react-bootstrap';
import { FaUserShield, FaChartLine, FaSchool, FaEnvelope, FaSignInAlt, FaCheckCircle } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLogin } from 'react-icons/hi';
import resultsImg from '../assets/results.png';
export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="bg-gradient" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Navbar */}
            <Navbar bg="white" expand="md" className="py-2 shadow-sm">
                <Container>
                    <Navbar.Brand href="/">
                        <img src="/assets/login.jpg" width="40" height="40" className="border rounded-circle me-2 border-primary" alt="School Logo" />
                        <span className="fw-bold fs-4 text-primary">School Results System</span>
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        <Button variant="primary" onClick={() => navigate('/login')}>
                            <FaSignInAlt className="me-2" /> Login
                        </Button>
                    </Nav>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <div className="hero-section d-flex align-items-center justify-content-center flex-grow-1" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)', minHeight: 400 }}>
                <Container>
                    <Row className="align-items-center">
                        <Col md={6} className="mb-4 text-center text-white text-md-start mb-md-0">
                            <h1 className="mb-3 display-3 fw-bold">Transforming School Results</h1>
                            <p className="mb-4 lead">Modern analytics, seamless reporting, and secure access for schools, students, and parents.</p>
                            <div className="gap-3 d-flex flex-column flex-sm-row justify-content-center justify-content-md-start">
                                <Button
                                    variant="light"
                                    className="fw-bold text-primary border-primary"
                                    onClick={() => window.open('mailto:cheptoyekbill@gmail.com?subject=Request%20Demo', '_blank')}
                                >
                                    <FaEnvelope className="me-2" /> Request Demo
                                </Button>
                                <Button
                                    variant="primary"
                                    className="fw-bold"
                                    onClick={() => navigate('/login')}
                                >
                                    <FaSignInAlt className="me-2" /> Login
                                </Button>
                            </div>
                        </Col>
                        <Col md={5} className="text-center">
                            <Image src={resultsImg} alt="Analytics" fluid rounded className="border border-2 shadow-lg border-primary" style={{ maxHeight: 300, maxWidth: 300, objectFit: 'cover' }} />
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Trusted By Section */}


            {/* Features Section */}
            <Container className="py-5">
                <h2 className="mb-4 text-center fw-bold text-primary">Key Features</h2>
                <Row className="g-4">
                    <Col md={4}>
                        <Card className="p-4 text-center border-0 shadow h-100 feature-card">
                            <Card.Body>
                                <FaSchool size={40} className="mb-3 text-primary" />
                                <h5 className="fw-bold text-primary">Multi-Tenant Support</h5>
                                <p>Serve multiple schools with isolated data, branding, and custom domains.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="p-4 text-center border-0 shadow h-100 feature-card">
                            <Card.Body>
                                <FaUserShield size={40} className="mb-3 text-primary" />
                                <h5 className="fw-bold text-primary">Secure Access</h5>
                                <p>Role-based authentication for admins, teachers, students, and parents.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="p-4 text-center border-0 shadow h-100 feature-card">
                            <Card.Body>
                                <FaChartLine size={40} className="mb-3 text-primary" />
                                <h5 className="fw-bold text-primary">Powerful Analytics</h5>
                                <p>Visualize performance trends, generate reports, and gain actionable insights.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container className="py-5">
                <h5 className="mb-4 text-center text-secondary">Trusted by leading schools and organizations</h5>
                <div className="flex-wrap gap-4 d-flex justify-content-center align-items-center">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" alt="Client 2" width={100} height={40} style={{ objectFit: 'contain' }} />
                </div>
            </Container>
            {/* Contact Section */}
            <Container className="py-5 rounded-3">
                <h2 className="mb-4 text-center fw-bold text-primary">Get in Touch</h2>
                <Row className="g-4">
                    <Col md={6}>
                        <Card className="p-4 border-0 shadow h-100">
                            <Card.Body>
                                <HiOutlineMail size={40} className="mb-3 text-primary" />
                                <h5 className="fw-bold text-primary">Email Us</h5>
                                <p>For inquiries, support, or feedback, reach out to us at:</p>
                                <Button variant="link" onClick={() => window.open('mailto:cheptoyekbill@gmail.com?subject=Contact%20Us', '_blank')} className="text-primary">
                                    <HiOutlineMail className="me-2" /> cheptoyekbill@gmail
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="p-4 border-0 shadow h-100">
                            <Card.Body>
                                <HiOutlineLogin size={40} className="mb-3 text-primary" />
                                <h5 className="fw-bold text-primary">Login to Your Account</h5>
                                <p>Access your school results and analytics dashboard:</p>
                                <Button variant="primary" onClick={() => navigate('/login')}>
                                    <FaSignInAlt className="me-2" /> Login
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            
            <Container className="py-5">
                <h2 className="mb-4 text-center fw-bold text-primary">Why Choose Us?</h2>
                <Row className="g-4">
                    <Col md={6}>
                        <Card className="p-4 border-0 shadow h-100">
                            <Card.Body>
                                <FaCheckCircle size={40} className="mb-3 text-success" />
                                <h5 className="fw-bold text-primary">Reliable Performance</h5>
                                <p>Our platform is built for scalability and reliability, ensuring your data is always accessible.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="p-4 border-0 shadow h-100">
                            <Card.Body>
                                <FaCheckCircle size={40} className="mb-3 text-success" />
                                <h5 className="fw-bold text-primary">User-Friendly Interface</h5>
                                <p>Intuitive design makes it easy for students, parents, and teachers to navigate and use.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
                
            {/* Footer */}
            <footer className="py-3 mt-auto text-center bg-white shadow-sm border-top text-secondary small">
                <FaCheckCircle className="text-success me-2" />
                &copy; {new Date().getFullYear()} Chetech-ug. All rights reserved.
            </footer>
        </div>
    );
}