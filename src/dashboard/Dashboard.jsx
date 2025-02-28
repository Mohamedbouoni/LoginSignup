import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import PropTypes from 'prop-types';
import './style.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faNewspaper, faFileAlt, faBuilding, faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Dashboard = ({ setIsAuthenticated }) => {
  const [navOpen, setNavOpen] = useState(true);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };
  const navigate = useNavigate();

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
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
              className="dpicn"
              alt="dp"
            />
          </div>
        </div>
      </header>

      <div className="main-container">

      <div className={`navcontainer ${navOpen ? '' : 'navclose'}`}>
      <nav className="nav">
        <div className="nav-upper-options">
          {['Dashboard', 'Articles', 'Report', 'Institution', 'Profile', 'Settings', 'Logout'].map((item, index) => {
            let icon;
            switch (index) {
              case 0: icon = faTachometerAlt; break;
              case 1: icon = faNewspaper; break;
              case 2: icon = faFileAlt; break;
              case 3: icon = faBuilding; break;
              case 4: icon = faUser; break;
              case 5: icon = faCog; break;
              case 6: icon = faSignOutAlt; break;
              default: icon = faTachometerAlt;
            }

            return (
              <div className={`nav-option option${index + 1}`} key={index}>
                <FontAwesomeIcon icon={icon} className="nav-img" />
                <h3>{item}</h3>
              </div>
            );
          })}
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
                  <h3 className="t-op" key={index}>{heading}</h3>
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
