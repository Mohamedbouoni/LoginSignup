import { useState } from "react";

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const userId = localStorage.getItem("userId");
  

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/change-password/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwords),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Password changed successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Old Password:</label>
        <input type="password" name="oldPassword" value={passwords.oldPassword} onChange={handleChange} required />

        <label>New Password:</label>
        <input type="password" name="newPassword" value={passwords.newPassword} onChange={handleChange} required />

        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
