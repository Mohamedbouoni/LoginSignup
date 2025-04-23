import { useState } from "react";
import axios from "axios";
import './AddUser.css'; 
export default function AddUser() {
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    password: "",
    role: "user",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", form.fullname);
    formData.append("username", form.username);
    formData.append("password", form.password);
    formData.append("role", form.role);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:5000/api/user/add-user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("User added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding user");
    }
  };

  return (
    <div className="add-user-container">
      <h2>Add User</h2>
      <form className="add-user-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="fullname" placeholder="Full Name" onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="file" name="image" onChange={handleImageChange} />
        <select name="role" onChange={handleChange} value={form.role}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="recruiter">Recruiter</option>
        </select>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
