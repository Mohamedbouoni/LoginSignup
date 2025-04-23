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
    { name: 'Settings', icon: faCog, route: '/settings' },
    { name: 'Logout', icon: faSignOutAlt, route: '/login', onClick: handleLogout }
  ];

  // Filter items based on user role
  const filteredNavItems = navItems.filter(item => !item.roles || item.roles.includes(role));
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
          {['admin', 'recruiter', 'user'].map((role, index) => (
          <div className="box" key={index}>
            <h2>Total {role.charAt(0).toUpperCase() + role.slice(1)}s</h2>
            <p>{roleCounts[role] ?? 0}</p> {/* Shows 0 if no users of that role */}
          </div>
        ))}
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
                    <h3 className="label-tag">{userItem.role}</h3>
                  </div>
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
