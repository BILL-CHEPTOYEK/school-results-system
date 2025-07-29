import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex flex-col">
            {/* Hero Section */}
            <header className="flex-1 flex flex-col justify-center items-center text-center px-4 py-16 relative">
                <div className="absolute inset-0">
                    <img src="/assets/login.jpg" alt="School" className="object-cover w-full h-full opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-700/60" />
                </div>
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6">
                        School Results & Analytics System
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-8 font-medium">
                        Empowering schools, students, and parents with real-time results, analytics, and seamless reporting.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => window.open('mailto:info@yourschool.com?subject=Request%20Demo', '_blank')}
                            className="px-8 py-3 rounded-lg bg-white text-blue-700 font-bold shadow-lg hover:bg-blue-100 transition-all text-lg"
                        >
                            Request Demo
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-8 py-3 rounded-lg bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-800 transition-all text-lg border-2 border-white"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </header>
            {/* Features Section */}
            <section className="py-16 bg-white/95">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Key Features</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-blue-50 rounded-xl p-6 shadow-md flex flex-col items-center">
                            <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 0l7 5v7a2 2 0 01-2 2H7a2 2 0 01-2-2V10l7-5zm0 0L5 10m7-5l7 5" />
                            </svg>
                            <h3 className="font-bold text-lg text-blue-800 mb-2">Multi-Tenant Support</h3>
                            <p className="text-blue-700 text-center">Serve multiple schools with isolated data, branding, and custom domains.</p>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-6 shadow-md flex flex-col items-center">
                            <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2m-4-4a4 4 0 100-8 4 4 0 000 8zm0 0v1.5a2.5 2.5 0 005 0V13a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <h3 className="font-bold text-lg text-blue-800 mb-2">Secure Access</h3>
                            <p className="text-blue-700 text-center">Role-based authentication for admins, teachers, students, and parents.</p>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-6 shadow-md flex flex-col items-center">
                            <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v4a1 1 0 001 1h3m10-5v4a1 1 0 001 1h3m-7 4v4m0 0l-3-3m3 3l3-3" />
                            </svg>
                            <h3 className="font-bold text-lg text-blue-800 mb-2">Powerful Analytics</h3>
                            <p className="text-blue-700 text-center">Visualize performance trends, generate reports, and gain actionable insights.</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer className="py-6 bg-blue-900 text-blue-100 text-center text-sm">
                &copy; {new Date().getFullYear()} Your School Name. All rights reserved.
            </footer>
        </div>
    );
}
