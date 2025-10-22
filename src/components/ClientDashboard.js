import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

const ClientDashboard = () => {
    const location = useLocation();

    const isActiveRoute = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h3>Client Portal</h3>
                </div>
                <nav className="sidebar-nav">
                    <Link 
                        to="/client" 
                        className={isActiveRoute('/client') ? 'nav-link active' : 'nav-link'}
                    >
                        Dashboard
                    </Link>
                    <Link 
                        to="/client/robots" 
                        className={isActiveRoute('/client/robots') ? 'nav-link active' : 'nav-link'}
                    >
                        My Robots
                    </Link>
                    <Link 
                        to="/client/mt5" 
                        className={isActiveRoute('/client/mt5') ? 'nav-link active' : 'nav-link'}
                    >
                        MT5 Accounts
                    </Link>
                    <Link 
                        to="/client/licenses" 
                        className={isActiveRoute('/client/licenses') ? 'nav-link active' : 'nav-link'}
                    >
                        Activate License
                    </Link>
                </nav>
            </div>

            <div className="main-content">
                <Routes>
                    <Route path="/" element={<ClientHome />} />
                    <Route path="/robots" element={<ClientRobots />} />
                    <Route path="/mt5" element={<MT5Accounts />} />
                    <Route path="/licenses" element={<ActivateLicense />} />
                </Routes>
            </div>
        </div>
    );
};

const ClientHome = () => {
    const [stats, setStats] = useState({
        activeRobots: 0,
        connectedAccounts: 0,
        expiringSoon: 0
    });

    useEffect(() => {
        // Mock data
        setStats({
            activeRobots: 2,
            connectedAccounts: 1,
            expiringSoon: 1
        });
    }, []);

    return (
        <div className="dashboard-home">
            <h1>Client Dashboard</h1>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Active Robots</h3>
                    <div className="stat-number">{stats.activeRobots}</div>
                </div>
                <div className="stat-card">
                    <h3>Connected Accounts</h3>
                    <div className="stat-number">{stats.connectedAccounts}</div>
                </div>
                <div className="stat-card">
                    <h3>Licenses Expiring Soon</h3>
                    <div className="stat-number">{stats.expiringSoon}</div>
                </div>
            </div>

            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                    <Link to="/client/licenses" className="action-btn">
                        Activate New License
                    </Link>
                    <Link to="/client/mt5" className="action-btn">
                        Connect MT5 Account
                    </Link>
                    <Link to="/client/robots" className="action-btn">
                        View My Robots
                    </Link>
                </div>
            </div>
        </div>
    );
};

const ClientRobots = () => {
    const [robots, setRobots] = useState([]);

    useEffect(() => {
        // Mock data
        setRobots([
            { id: 1, name: 'Gold Trader Pro', license_key: 'LIC-ABC123DEF456', expires_at: '2024-12-31', status: 'Active' },
            { id: 2, name: 'Forex Scalper', license_key: 'LIC-GHI789JKL012', expires_at: '2024-11-15', status: 'Active' }
        ]);
    }, []);

    return (
        <div className="robots-page">
            <h1>My Active Robots</h1>
            <div className="robots-grid">
                {robots.map(robot => (
                    <div key={robot.id} className="robot-card">
                        <h3>{robot.name}</h3>
                        <p>License: {robot.license_key}</p>
                        <p>Status: <span style={{color: robot.status === 'Active' ? 'green' : 'red'}}>
                            {robot.status}
                        </span></p>
                        <p>Expires: {new Date(robot.expires_at).toLocaleDateString()}</p>
                        <div className="robot-actions">
                            <button className="btn-primary">Download EA</button>
                            <button>Renew License</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MT5Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [showConnectForm, setShowConnectForm] = useState(false);
    const [accountForm, setAccountForm] = useState({
        account_number: '',
        password: '',
        server: ''
    });

    useEffect(() => {
        // Mock data
        setAccounts([
            { id: 1, account_number: '12345678', server: 'MetaQuotes-Demo', platform: 'Windows', last_sync: '2024-10-20T10:30:00' }
        ]);
    }, []);

    const handleConnectAccount = (e) => {
        e.preventDefault();
        const newAccount = {
            id: accounts.length + 1,
            account_number: accountForm.account_number,
            server: accountForm.server,
            platform: 'Web',
            last_sync: new Date().toISOString()
        };
        setAccounts([...accounts, newAccount]);
        setShowConnectForm(false);
        setAccountForm({ account_number: '', password: '', server: '' });
        alert('MT5 account connected successfully!');
    };

    return (
        <div className="mt5-accounts-page">
            <div className="section-header">
                <h1>MT5 Accounts</h1>
                <button onClick={() => setShowConnectForm(true)} className="btn-primary">
                    Connect New Account
                </button>
            </div>

            {showConnectForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Connect MT5 Account</h2>
                        <form onSubmit={handleConnectAccount}>
                            <input
                                type="text"
                                placeholder="Account Number"
                                value={accountForm.account_number}
                                onChange={(e) => setAccountForm({...accountForm, account_number: e.target.value})}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={accountForm.password}
                                onChange={(e) => setAccountForm({...accountForm, password: e.target.value})}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Server"
                                value={accountForm.server}
                                onChange={(e) => setAccountForm({...accountForm, server: e.target.value})}
                                required
                            />
                            <div className="modal-actions">
                                <button type="submit" className="btn-primary">Connect</button>
                                <button type="button" onClick={() => setShowConnectForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="accounts-list">
                {accounts.map(account => (
                    <div key={account.id} className="robot-card">
                        <h3>Account: {account.account_number}</h3>
                        <p>Server: {account.server}</p>
                        <p>Platform: {account.platform}</p>
                        <p>Last Sync: {new Date(account.last_sync).toLocaleString()}</p>
                        <div className="robot-actions">
                            <button className="btn-primary">Sync Now</button>
                            <button className="btn-danger">Disconnect</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ActivateLicense = () => {
    const [licenseKey, setLicenseKey] = useState('');

    const handleActivateLicense = (e) => {
        e.preventDefault();
        if (licenseKey) {
            alert(`License ${licenseKey} activated successfully!`);
            setLicenseKey('');
        } else {
            alert('Please enter a license key');
        }
    };

    return (
        <div className="activate-license-page">
            <h1>Activate License</h1>
            <div className="auth-form" style={{maxWidth: '500px', margin: '0 auto'}}>
                <form onSubmit={handleActivateLicense}>
                    <div className="form-group">
                        <label>License Key:</label>
                        <input
                            type="text"
                            placeholder="Enter your license key (e.g., LIC-ABC123DEF456)"
                            value={licenseKey}
                            onChange={(e) => setLicenseKey(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{width: '100%'}}>
                        Activate License
                    </button>
                </form>
                
                <div style={{marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '5px'}}>
                    <h3>How to get a license key?</h3>
                    <p>Contact your mentor to get a license key for their trading robots.</p>
                    <p>Once you have the key, enter it above to activate your robot.</p>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
