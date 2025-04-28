import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Employees.css';

const Employees = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', position: '', department: '', status: 'Active', salary: '' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Axios instance (better for base URL)
  const api = axios.create({
    baseURL: 'http://localhost:5000/api' // <-- your backend address
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get('/employees');
        if (Array.isArray(response.data)) {
          setEmployees(response.data);
        } else if (Array.isArray(response.data.employees)) {
          setEmployees(response.data.employees);
        } else {
          console.error('Expected an array of employees');
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const openAddModal = () => {
    setFormData({ name: '', position: '', department: '', status: 'Active', salary: '' });
    setEditMode(false);
    setShowModal(true);
  };

  const openEditModal = (employee) => {
    setFormData({
      name: employee.name,
      position: employee.position,
      department: employee.department,
      status: employee.status,
      salary: employee.salary
    });
    setEditMode(true);
    setEditId(employee._id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        const updatedEmployee = { ...formData };
        await api.put(`/employees/${editId}`, updatedEmployee);
        setEmployees(prev => prev.map(emp => emp._id === editId ? { ...emp, ...updatedEmployee } : emp));
      } else {
        const newEmployee = { ...formData };
        const response = await api.post('/employees', newEmployee);
        setEmployees(prev => [...prev, response.data]);
      }
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      setEmployees(prev => prev.filter(emp => emp._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', position: '', department: '', status: 'Active', salary: '' });
    setEditMode(false);
    setEditId(null);
  };

  return (
    <div className="employees-container">
      <div className="back-button" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </div>

      <div className="header">
        <h1>👥 Employee Management</h1>
        <button className="add-btn" onClick={openAddModal}>+ Add Employee</button>
      </div>

      <div className="employee-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Status</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>
                  <span className={`status ${emp.status.toLowerCase().replace(" ", "-")}`}>
                    {emp.status}
                  </span>
                </td>
                <td>${emp.salary}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEditModal(emp)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(emp._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editMode ? "Edit Employee" : "Add New Employee"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
              <input
                type="number"
                placeholder="Salary"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                required
              />
              <div className="modal-actions">
                <button type="submit" className="add-btn">
                  {editMode ? "Update" : "Add"}
                </button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
