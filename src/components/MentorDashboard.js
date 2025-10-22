import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

const MentorDashboard = () => {
    const [stats, setStats] = useState({
        totalRobots: 0,
        activeLicenses: 0,
        totalClients: 0,
        monthlyRevenue: 0
    });
    
    const location = useLocation();

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = () => {
        // Mock data
        setStats({
            totalRobots: 3,
            activeLicenses: 15,
            totalClients: 8,
            monthlyRevenue: 1250
        });
    };

    const isActiveRoute = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h3>Mentor Portal</h3>
                </div>
                <nav className="sidebar-nav">
                    <Link 
                        to="/mentor" 
                        className={isActiveRoute('/mentor') ? 'nav-link active' : 'nav-link'}
                    >
                        Dashboard
                    </Link>
                    <Link 
                        to="/mentor/robots" 
                        className={isActiveRoute('/mentor/robots') ? 'nav-link active' : 'nav-link'}
                    >
                        My Robots
                    </Link>
                    <Link 
                        to="/mentor/licenses" 
                        className={isActiveRoute('/mentor/licenses') ? 'nav-link active' : 'nav-link'}
                    >
                        License Manager
                    </Link>
                    <Link 
                        to="/mentor/clients" 
                        className={isActiveRoute('/mentor/clients') ? 'nav-link active' : 'nav-link'}
                    >
                        Clients
                    </Link>
                </nav>
            </div>

            <div className="main-content">
                <Routes>
                    <Route path="/" element={<DashboardHome stats={stats} />} />
                    <Route path="/robots" element={<RobotManager />} />
                    <Route path="/licenses" element={<LicenseManager />} />
                    <Route path="/clients" element={<ClientsPage />} />
                </Routes>
            </div>
        </div>
    );
};

const DashboardHome = ({ stats }) => {
    return (
        <div className="dashboard-home">
            <h1>Mentor Dashboard</h1>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Robots</h3>
                    <div className="stat-number">{stats.totalRobots}</div>
                </div>
                <div className="stat-card">
                    <h3>Active Licenses</h3>
                    <div className="stat-number">{stats.activeLicenses}</div>
                </div>
                <div className="stat-card">
                    <h3>Total Clients</h3>
                    <div className="stat-number">{stats.totalClients}</div>
                </div>
                <div className="stat-card">
                    <h3>Monthly Revenue</h3>
                    <div className="stat-number">${stats.monthlyRevenue}</div>
                </div>
            </div>

            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                    <Link to="/mentor/robots" className="action-btn">
                        Upload New Robot
                    </Link>
                    <Link to="/mentor/licenses" className="action-btn">
                        Generate License Key
                    </Link>
                    <Link to="/mentor/clients" className="action-btn">
                        View Clients
                    </Link>
                </div>
            </div>
        </div>
    );
};

const RobotManager = () => {
    const [robots, setRobots] = useState([]);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [robotForm, setRobotForm] = useState({
        name: '',
        description: '',
        download_link: '',
        version: '1.0',
        price: 0
    });

    useEffect(() => {
        // Mock data
        setRobots([
            { id: 1, name: 'Gold Trader Pro', description: 'Advanced gold trading EA', version: '2.1', price: 99 },
            { id: 2, name: 'Forex Scalper', description: 'High-frequency scalping robot', version: '1.5', price: 149 },
            { id: 3, name: 'Trend Master', description: 'Trend-following expert advisor', version: '3.0', price: 79 }
        ]);
    }, []);

    const handleUploadRobot = (e) => {
        e.preventDefault();
        const newRobot = {
            id: robots.length + 1,
            ...robotForm
        };
        setRobots([...robots, newRobot]);
        setShowUploadForm(false);
        setRobotForm({ name: '', description: '', download_link: '', version: '1.0', price: 0 });
        alert('Robot uploaded successfully!');
    };

    return (
        <div className="robots-page">
            <div className="section-header">
                <h1>My Trading Robots</h1>
                <button onClick={() => setShowUploadForm(true)} className="btn-primary">
                    Upload New Robot
                </button>
            </div>

            {showUploadForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Upload Trading Robot</h2>
                        <form onSubmit={handleUploadRobot}>
                            <input
                                type="text"
                                placeholder="Robot Name"
                                value={robotForm.name}
                                onChange={(e) => setRobotForm({...robotForm, name: e.target.value})}
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={robotForm.description}
                                onChange={(e) => setRobotForm({...robotForm, description: e.target.value})}
                                required
                            />
                            <input
                                type="url"
                                placeholder="Download Link"
                                value={robotForm.download_link}
                                onChange={(e) => setRobotForm({...robotForm, download_link: e.target.value})}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Version"
                                value={robotForm.version}
                                onChange={(e) => setRobotForm({...robotForm, version: e.target.value})}
                            />
                            <input
                                type="number"
                                placeholder="Monthly Price ($)"
                                value={robotForm.price}
                                onChange={(e) => setRobotForm({...robotForm, price: parseInt(e.target.value)})}
                            />
                            <div className="modal-actions">
                                <button type="submit" className="btn-primary">Upload</button>
                                <button type="button" onClick={() => setShowUploadForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="robots-grid">
                {robots.map(robot => (
                    <div key={robot.id} className="robot-card">
                        <h3>{robot.name}</h3>
                        <p>{robot.description}</p>
                        <p>Version: {robot.version}</p>
                        <p>Price: ${robot.price}/month</p>
                        <div className="robot-actions">
                            <button className="btn-primary">View Licenses</button>
                            <button>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LicenseManager = () => {
    const [licenses, setLicenses] = useState([]);
    const [showGenerateForm, setShowGenerateForm] = useState(false);
    const [licenseForm, setLicenseForm] = useState({
        robot_id: '',
        duration_days: 30,
        client_email: ''
    });

    useEffect(() => {
        // Mock data
        setLicenses([
            { id: 1, license_key: 'LIC-ABC123DEF456', robot_name: 'Gold Trader Pro', client_email: 'client1@email.com', expires_at: '2024-12-31', is_active: true },
            { id: 2, license_key: 'LIC-GHI789JKL012', robot_name: 'Forex Scalper', client_email: 'client2@email.com', expires_at: '2024-11-15', is_active: true }
        ]);
    }, []);

    const handleGenerateLicense = (e) => {
        e.preventDefault();
        const newLicense = {
            id: licenses.length + 1,
            license_key: 'LIC-' + Math.random().toString(36).substr(2, 12).toUpperCase(),
            robot_name: 'New Robot',
            client_email: licenseForm.client_email || 'Not assigned',
            expires_at: new Date(Date.now() + licenseForm.duration_days * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            is_active: true
        };
        setLicenses([...licenses, newLicense]);
        setShowGenerateForm(false);
        setLicenseForm({ robot_id: '', duration_days: 30, client_email: '' });
        alert('License generated successfully!');
    };

    return (
        <div className="licenses-page">
            <div className="section-header">
                <h1>License Manager</h1>
                <button onClick={() => setShowGenerateForm(true)} className="btn-primary">
                    Generate License Key
                </button>
            </div>

            {showGenerateForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Generate License Key</h2>
                        <form onSubmit={handleGenerateLicense}>
                            <select
                                value={licenseForm.robot_id}
                                onChange={(e) => setLicenseForm({...licenseForm, robot_id: e.target.value})}
                                required
                            >
                                <option value="">Select Robot</option>
                                <option value="1">Gold Trader Pro</option>
                                <option value="2">Forex Scalper</option>
                                <option value="3">Trend Master</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Duration (days)"
                                value={licenseForm.duration_days}
                                onChange={(e) => setLicenseForm({...licenseForm, duration_days: parseInt(e.target.value)})}
                            />
                            <input
                                type="email"
                                placeholder="Client Email (optional)"
                                value={licenseForm.client_email}
                                onChange={(e) => setLicenseForm({...licenseForm, client_email: e.target.value})}
                            />
                            <div className="modal-actions">
                                <button type="submit" className="btn-primary">Generate</button>
                                <button type="button" onClick={() => setShowGenerateForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="licenses-list">
                {licenses.map(license => (
                    <div key={license.id} className="robot-card">
                        <h3>License: {license.license_key}</h3>
                        <p>Robot: {license.robot_name}</p>
                        <p>Client: {license.client_email}</p>
                        <p>Expires: {license.expires_at}</p>
                        <p>Status: <span style={{color: license.is_active ? 'green' : 'red'}}>
                            {license.is_active ? 'Active' : 'Expired'}
                        </span></p>
                        <div className="robot-actions">
                            <button className="btn-primary">Renew</button>
                            <button className="btn-danger">Revoke</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ClientsPage = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        // Mock data
        setClients([
            { id: 1, full_name: 'John Smith', email: 'john@email.com', active_licenses: 2, joined_date: '2024-01-15' },
            { id: 2, full_name: 'Sarah Johnson', email: 'sarah@email.com', active_licenses: 1, joined_date: '2024-02-20' },
            { id: 3, full_name: 'Mike Wilson', email: 'mike@email.com', active_licenses: 3, joined_date: '2024-03-10' }
        ]);
    }, []);

    return (
        <div className="clients-page">
            <h1>My Clients</h1>
            <div className="clients-list">
                {clients.map(client => (
                    <div key={client.id} className="client-card">
                        <h3>{client.full_name}</h3>
                        <p>Email: {client.email}</p>
                        <p>Active Licenses: {client.active_licenses}</p>
                        <p>Joined: {new Date(client.joined_date).toLocaleDateString()}</p>
                        <div className="robot-actions">
                            <button className="btn-primary">View Details</button>
                            <button>Contact</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MentorDashboard;
