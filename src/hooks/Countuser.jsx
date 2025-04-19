// src/Countuser.js
import { useEffect, useState } from 'react';

function Countuser() {
    const [loggedUsers, setLoggedUsers] = useState([]);

    // Fetch the list of logged-in users on component mount
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        fetch(`${process.env.REACT_APP_API_URL}/api/auth/logged-users`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then((data) => setLoggedUsers(data))
          .catch((error) => console.error('Error fetching logged users:', error));
      }
    }, []); // Empty dependency array ensures this runs once when the component mounts
  
    return (
      <div>
        <h1>Welcome to the Dashboard!</h1>
        <h2>Logged-in Users:</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Login Date</th>
            </tr>
          </thead>
          <tbody>
            {loggedUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{new Date(user.loginDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

export default Countuser;
