import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="sidebar-icon active" data-tooltip="Home">
                    <Link to="/">🏠</Link>
                </div>
                <div className="sidebar-icon" data-tooltip="Dashboard">
                    <Link to="/dashboard">📊</Link>
                </div>
                <div className="sidebar-icon" data-tooltip="Login">
                    <Link to="/login">🔑</Link>
                </div>
                <div className="sidebar-icon" data-tooltip="Signup">
                    <Link to="/signup">📝</Link>
                </div>
            </div>

            <div className="main-content">
                <div className="header">
                    <h1>Dashboard</h1>
                    <div className="search-bar">
                        <span>🔍</span>
                        <input type="text" placeholder="Search" />
                    </div>
                </div>
                <div className="stats">
                    <div className="stat-card">
                        <h3>Total Income</h3>
                        <div className="stat-value">
                            $1200 <span>+45%</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <h3>Total Expense</h3>
                        <div className="stat-value">
                            4.500K <span>+45%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
