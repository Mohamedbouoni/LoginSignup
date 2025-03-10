import { useState, useEffect } from 'react';
import './UserProfile.css';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState(null);

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

    if (!user) return <div>Loading...</div>;

    return (
        <div className='card-profile'>
            <Link to='/dashboard'><h2>Dashboard</h2></Link>
            
            <div className='Profile'>
                <h1>User Profile</h1>
                {user.image && <img src={`http://localhost:5000/${user.image}`} alt="Profile" className="profile-image" />}
                <p><strong>Full Name:</strong> {user.fullname}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Password:</strong> {user.password}</p>
            </div>
        </div>
    );
};

export default UserProfile;
