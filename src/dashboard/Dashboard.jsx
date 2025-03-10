import { Link, useNavigate } from 'react-router-dom';
import { toast ,ToastContainer} from 'react-toastify';
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
  const [user,setUser] = useState(null);
  
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log(userId)

    if (userId) {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/user/${userId}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }
}, []);
    

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
      toast.success('Login successfully!', { position: "top-right", autoClose: 3000});
      
    }
  }, []);
  

  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/login');
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
            {user?.image && <img src={`http://localhost:5000/${user.image}`} alt="Profile" className="profile-img" />}
            </Link>
            
          </div>
          {showModal && <UserProfile user={userInfo} onClose={() => setShowModal(false)} />}
        </div>
      </header>

      <div className="main-container">

        <div className={`navcontainer ${navOpen ? '' : 'navclose'}`}>
        <nav className="nav">
          <div className="nav-upper-options">
            {[
              { name: 'Dashboard', icon: faTachometerAlt, route: '/' },
              { name: 'Employees', icon: faUsers, route: '/employees' },
              { name: 'Departments', icon: faBuilding, route: '/departments' },
              { name: 'Leave Requests', icon: faCalendarAlt, route: '/leave-requests' },
              { name: 'Recruitment', icon: faUser, route: '/recruitment' },
              { name: 'Settings', icon: faCog, route: '/settings' },
              { name: 'Logout', icon: faSignOutAlt, route: '/login', onClick: handleLogout }
            ].map((item, index) => (
              <div
                className={`nav-option option${index + 1}`}
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
            {[
              { heading: '60.5k', topic: 'Article Views', icon: 'fa-chart-bar' },
              { heading: '150', topic: 'Comments', icon: 'fa-comments' },
              { heading: '320', topic: 'Likes', icon: 'fa-thumbs-up' },
              { heading: '70', topic: 'Published', icon: 'fa-check-circle' }
            ].map((box, index) => (
              <div className={`box box${index + 1}`} key={index}>
                <div className="text">
                  <h2 className="topic-heading">{box.heading}</h2>
                  <h2 className="topic">{box.topic}</h2>
                </div>
                <i className={`fas ${box.icon} icon`}></i>
              </div>
            ))}
          </div>

          <div className="report-container">
            <div className="report-header">
              <h1 className="recent-Articles">Recent Articles</h1>
              <button className="view">View All</button>
            </div>

            <div className="report-body">
              <div className="report-topic-heading">
                {['Article', 'Views', 'Comments', 'Status'].map((heading, index) => (
                  <h3 className="t-op" key={index}
                  >{heading}</h3>
                ))}
              </div>
              <div className="items">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div className="item1" key={index}>
                    <h3 className="t-op-nextlvl">Article {73 - index}</h3>
                    <h3 className="t-op-nextlvl">{(Math.random() * 3 + 1).toFixed(1)}k</h3>
                    <h3 className="t-op-nextlvl">{Math.floor(Math.random() * 600)}</h3>
                    <h3 className="t-op-nextlvl label-tag">Published</h3>
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
