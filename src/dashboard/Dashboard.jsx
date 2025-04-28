import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from '../pages/UserProfile';
import './Dashboard.css';
import PropTypes from 'prop-types';
import './style.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faBuilding, faCalendarAlt, faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Cell, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { faUserShield, faUserTie, faUser as faUserIcon } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { FaUserShield, FaUserTie, FaUser } from 'react-icons/fa'; // Importing icons


const Dashboard = ({ setIsAuthenticated }) => {
  const [navOpen, setNavOpen] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Store role in state
  const [allUsers, setAllUsers] = useState([]);
  const [roleCounts, setRoleCounts] = useState({
    user: 0,
    admin: 0,
    recruiter: 0
  });
  const [roleStats, setRoleStats] = useState([]);

  useEffect(() => {
    const fetchRoleStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/signup-stats');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRoleStats(data);
      } catch (error) {
        console.error('Error fetching role stats:', error);
      }
    };

    fetchRoleStats();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role");

    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/user/${userId}`);
          if (!response.ok) throw new Error('Failed to fetch user data');

          const data = await response.json();
          setUser(data);
          setRole(data.role || storedRole); // Update role dynamically
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }

    if (storedRole) {
      setRole(storedRole.trim());
    }

  }, []);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setAllUsers(data); // Assuming you have the `setAllUsers` function to set the state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    const countRoles = () => {
      const roleCounts = { user: 0, admin: 0, recruiter: 0 };
      allUsers.forEach(user => {
        if (user.role === 'user') roleCounts.user += 1;
        if (user.role === 'admin') roleCounts.admin += 1;
        if (user.role === 'recruiter') roleCounts.recruiter += 1;
      });
      setRoleCounts(roleCounts);
    };

    if (allUsers.length > 0) {
      countRoles(); // Call the function when users are fetched
    }
  }, [allUsers]);







  const toggleNav = () => {
    setNavOpen(!navOpen);
  };
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    const userId = localStorage.getItem("userId");
    console.log('User ID from localStorage:', userId); // Log userId to check

    if (!userId) {
      console.error('No user ID found');
      return;
    }

    try {
      const response = await fetch(`/api/user/${userId}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUserInfo(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  const [showProfile, setShowProfile] = useState(false);

  const handleIconClick = () => {
    navigate('/user-profile');
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      toast.success('Login successfully!', { position: "top-right", autoClose: 3000 });

    }
  }, []);



  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const changeUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`  // Assuming you have a token for authentication
        },
        body: JSON.stringify({ role: newRole })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Role updated to ${newRole}`, { position: "top-right", autoClose: 3000 });
        // Optionally update the UI after role change
      } else {
        toast.error(`Failed to update role: ${data.message}`, { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      toast.error('Error updating role', { position: "top-right", autoClose: 3000 });
      console.error('Error updating role:', error);
    }
  };



  const navItems = [
    { name: 'Dashboard', icon: faTachometerAlt, route: '/' },
    { name: 'Add User', icon: faUser, route: '/add-user', roles: ['admin'] },
    { name: 'Employees', icon: faUsers, route: '/employees', roles: ['admin', 'recruiter'] },
    { name: 'Recruitment', icon: faUser, route: '/recruitment', roles: ['admin', 'recruiter'] },
    { name: 'Departments', icon: faBuilding, route: '/departments' },
    { name: 'Leave Requests', icon: faCalendarAlt, route: '/leave-requests' },
    { name: 'Logout', icon: faSignOutAlt, route: '/login', onClick: handleLogout }
  ];
  const handleEdit = () => {
    navigate(`/user-profile`);
  }

  // Filter items based on user role
  const filteredNavItems = navItems.filter(item => !item.roles || item.roles.includes(role));

  const handleDelete = async (userId, username) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete user "${username}"?`);

    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // If token is needed
        }
      });

      if (response.ok) {
        toast.success("User deleted successfully");
        setAllUsers(prevUsers => prevUsers.filter(user => user._id !== userId)); // Remove from UI
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete user: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      toast.error("Error deleting user");
      console.error("Delete error:", error);
    }
  };

  const roleStyles = {
    admin: {
      color: '#e63946',
      icon: faUserShield
    },
    recruiter: {
      color: '#ffb703',
      icon: faUserTie
    },
    user: {
      color: '#219ebc',
      icon: faUserIcon
    }
  };

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const savedEmployees = JSON.parse(localStorage.getItem("employees"));
    if (savedEmployees) {
      setEmployees(savedEmployees);
    }
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/change-role/${userId}`, {   // Use your correct API route
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      const data = await response.json();
      console.log('Role updated:', data);

      // Update the user in the local state (optional for faster UI)
      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role');
    }
  };


  return (
    <>
      <header>

        <div className="logosec">
          <div className="logo">HORIZON</div>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
            className="icn menuicn"
            id="menuicn"
            alt="menu-icon"
            onClick={toggleNav}
          />
        </div>

        <div className="searchbar">
          <ToastContainer />
          <input type="text" placeholder="Search" />
          <div className="searchbtn">
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
              className="icn srchicn"
              alt="search-icon"
            />
          </div>
        </div>

        <div className="message">
          <div className="circle"></div>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/8.png"
            className="icn"
            alt="message-icon"
          />
          <div className="dp">
            <Link to="/user-profile">
              {user?.image && (
                <img
                  src={`http://localhost:5000/${user.image}`}
                  alt="Profile"
                  className="profile-img"
                  onClick={() => setShowModal(true)}  // Open modal on click
                />
              )}
            </Link>
          </div>

          {/* Modal for User Profile */}
          {showModal && <UserProfile user={userInfo} onClose={() => setShowModal(false)} />}
        </div>
      </header>

      <div className="main-container">

        <div className={`navcontainer ${navOpen ? '' : 'navclose'}`}>
          <nav className="nav">
            <div className="nav-upper-options">
              {filteredNavItems.map((item, index) => (
                <div
                  className="nav-option"
                  key={index}
                  onClick={item.onClick ? item.onClick : () => navigate(item.route)}
                >
                  <FontAwesomeIcon icon={item.icon} className="nav-img" />
                  <h3>{item.name}</h3>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="main">
          <div className="searchbar2">
            <input type="text" placeholder="Search" />
            <div className="searchbtn">
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
                className="icn srchicn"
                alt="search-button"
              />
            </div>
          </div>

          <div className="box-container">
            {['admin', 'recruiter', 'user'].map((role, index) => {
              const colors = [
                'linear-gradient(to bottom, #1da256, #48d483)', // Admin
                'linear-gradient(to bottom, #007bff, #00c6ff)', // Recruiter
                'linear-gradient(to bottom, #ff7f50, #ffb347)'  // User
              ];

              const icons = {
                admin: <FaUserShield size={30} color="white" />,
                recruiter: <FaUserTie size={30} color="white" />,
                user: <FaUser size={30} color="white" />
              };

              return (
                <div
                  className="box"
                  key={index}
                  style={{ background: colors[index] }}
                >
                  <div className="box-content">
                    {icons[role]}
                    <div>
                      <h2>Total {role.charAt(0).toUpperCase() + role.slice(1)}s</h2>
                      <p>{roleCounts[role] ?? 0}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="chart-container">
            <h2>User Role Statistics Over Time</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={roleStats}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="admin" fill="#4f46e5" />
                <Bar dataKey="user" fill="#6ee7b7" />
                <Bar dataKey="recruiter" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>

          </div>



          <div className="report-container">
            <div className="report-header">
              <h1 className="recent-Articles">Recent Articles</h1>
              <p className="user-role">{role}</p> {/* Display role */}

              <button className="view">View All</button>
            </div>

            <div className="report-body">
              <div className="report-topic-heading">
                {['Username', 'Role'].map((heading, index) => (
                  <h3 className="t-op" key={index}>{heading}</h3>
                ))}


              </div>
              <div className="items">
                {allUsers.map((userItem, index) => (
                  <div className="item1" key={index}>
                    <h3 className="t-op-nextlvl">{userItem.username}</h3>
                    <button
                      className='btn-delete'
                      onClick={() => handleDelete(userItem._id, userItem.username)}
                    >
                      Delete
                    </button>
                    <div className="role-select-container">
                      <div className={`label-tag ${userItem.role}`}>
                        <FontAwesomeIcon icon={roleStyles[userItem.role]?.icon} className="fa-icon" />
                        {userItem.role}
                      </div>
                      <select
                        value={userItem.role}
                        onChange={(e) => handleRoleChange(userItem._id, e.target.value)}
                        className="role-select"
                      >
                        {['user', 'admin', 'recruiter'].map((roleOption) => (
                          <option key={roleOption} value={roleOption}>
                            {roleOption}
                          </option>
                        ))}
                      </select>
                    </div>                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Dashboard.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Dashboard;
