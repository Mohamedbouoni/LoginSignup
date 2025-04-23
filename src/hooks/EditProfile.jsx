import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = ({setIsAuthenticated}) => {
    const [user, setUser] = useState({ fullname: "", username: "" });
    const navigate = useNavigate();
    
    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        const userId = localStorage.getItem("userId");

        if (!isAuthenticated || !userId) {
            navigate("/login"); // Redirect to login if not authenticated
            return;
        }

        fetch(`http://localhost:5000/api/user/${userId}`)
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((error) => console.error("Error fetching user:", error));
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/user/${user._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                navigate("/user-profile");
            } else {
                console.error("Error updating profile");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    if (!user._id) return <div>Loading...</div>;

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <label>Full Name:</label>
                <input type="text" name="fullname" value={user.fullname} onChange={handleChange} />

                <label>Username:</label>
                <input type="text" name="username" value={user.username} onChange={handleChange} />

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;
