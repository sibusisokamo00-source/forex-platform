import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MentorDashboard from './components/MentorDashboard';
import ClientDashboard from './components/ClientDashboard';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = () => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('userRole');
        
        if (token && role) {
            setIsAuthenticated(true);
            setUserRole(role);
        }
        setLoading(false);
    };

    const handleLogin = (token, role) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', role);
        setIsAuthenticated(true);
        setUserRole(role);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setIsAuthenticated(false);
        setUserRole('');
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <Router>
            <div className="App">
                {isAuthenticated && (
                    <nav className="navbar">
                        <div className="nav-brand">
                            <h2>Forex Robot Platform</h2>
                        </div>
                        <div className="nav-links">
                            <span>Welcome, {userRole}</span>
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
                        </div>
                    </nav>
                )}

                <Routes>
                    <Route 
                        path="/login" 
                        element={
                            !isAuthenticated ? 
                            <Login onLogin={handleLogin} /> : 
                            <Navigate to={userRole === 'mentor' ? '/mentor' : '/client'} />
                        } 
                    />
                    <Route 
                        path="/register" 
                        element={
                            !isAuthenticated ? 
                            <Register /> : 
                            <Navigate to={userRole === 'mentor' ? '/mentor' : '/client'} />
                        } 
                    />
                    <Route 
                        path="/mentor/*" 
                        element={
                            isAuthenticated && userRole === 'mentor' ? 
                            <MentorDashboard /> : 
                            <Navigate to="/login" />
                        } 
                    />
                    <Route 
                        path="/client/*" 
                        element={
                            isAuthenticated && userRole === 'client' ? 
                            <ClientDashboard /> : 
                            <Navigate to="/login" />
                        } 
                    />
                    <Route 
                        path="/" 
                        element={
                            isAuthenticated ? 
                            <Navigate to={userRole === 'mentor' ? '/mentor' : '/client'} /> :
                            <Navigate to="/login" />
                        } 
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
