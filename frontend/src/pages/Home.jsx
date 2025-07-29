import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
            
            {/* Hero Section */}
            <header className="relative flex flex-col items-center justify-center flex-1 px-4 py-16 text-center">
                <div className="absolute inset-0">
                    <img src="/assets/login.jpg" alt="School" className="object-cover w-full h-full opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-700/60" />
                </div>
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h1 className="mb-6 text-5xl font-extrabold text-white md:text-6xl drop-shadow-lg">
                        School Results & Analytics System
                    </h1>
                    <p className="mb-8 text-xl font-medium text-blue-100 md:text-2xl">
                        Empowering schools, students, and parents with real-time results, analytics, and seamless reporting.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <button
                            onClick={() => window.open('mailto:cheptoyekbill@gmail.com?subject=Request%20Demo', '_blank')}
                            className="px-8 py-3 text-lg font-bold text-blue-700 transition-all bg-white rounded-lg shadow-lg hover:bg-blue-100"
                        >
                            Request Demo
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-8 py-3 text-lg font-bold text-white transition-all bg-blue-600 border-2 border-white rounded-lg shadow-lg hover:bg-blue-800"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </header>
            {/* Features Section */}
            <section className="py-16 bg-white/95">
                <div className="max-w-5xl px-4 mx-auto">
                    <h2 className="mb-8 text-3xl font-bold text-center text-blue-900">Key Features</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="flex flex-col items-center p-6 shadow-md bg-blue-50 rounded-xl">
                            <svg className="w-12 h-12 mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 0l7 5v7a2 2 0 01-2 2H7a2 2 0 01-2-2V10l7-5zm0 0L5 10m7-5l7 5" />
                            </svg>
                            <h3 className="mb-2 text-lg font-bold text-blue-800">Multi-Tenant Support</h3>
                            <p className="text-center text-blue-700">Serve multiple schools with isolated data, branding, and custom domains.</p>
                        </div>
                        <div className="flex flex-col items-center p-6 shadow-md bg-blue-50 rounded-xl">
                            <svg className="w-12 h-12 mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2m-4-4a4 4 0 100-8 4 4 0 000 8zm0 0v1.5a2.5 2.5 0 005 0V13a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <h3 className="mb-2 text-lg font-bold text-blue-800">Secure Access</h3>
                            <p className="text-center text-blue-700">Role-based authentication for admins, teachers, students, and parents.</p>
                        </div>
                        <div className="flex flex-col items-center p-6 shadow-md bg-blue-50 rounded-xl">
                            <svg className="w-12 h-12 mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v4a1 1 0 001 1h3m10-5v4a1 1 0 001 1h3m-7 4v4m0 0l-3-3m3 3l3-3" />
                            </svg>
                            <h3 className="mb-2 text-lg font-bold text-blue-800">Powerful Analytics</h3>
                            <p className="text-center text-blue-700">Visualize performance trends, generate reports, and gain actionable insights.</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer className="py-6 text-sm text-center text-blue-100 bg-blue-900">
                &copy; {new Date().getFullYear()} Your School Name. All rights reserved.
            </footer>
        </div>
    );
}
