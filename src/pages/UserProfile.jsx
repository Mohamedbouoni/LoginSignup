import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            fetch(`http://localhost:5000/api/user/${userId}`)
                .then((res) => res.json())
                .then((data) => setUser(data))
                .catch((error) => console.error("Error fetching user data:", error));
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
        navigate('/login');
      };

    if (!user) return <div>Loading...</div>;

    return (
        <div className='card-profile'>
            <h2>User Profile</h2>
            <div className='Profile'>
                {user.image && <img src={`http://localhost:5000/${user.image}`} alt="Profile" className="profile-image" />}
                <p><strong>Full Name:</strong> {user.fullname}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>password:</strong> {user.password}</p>
                <p><strong>Role:</strong> {user.role}</p>

                <div className="profile-actions">
                    <button onClick={() => navigate(`/edit-profile/${user._id}`)}>Edit Profile</button>
                    <button onClick={() => navigate(`/change-password/${user._id}`)}>Change Password</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
