import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Employees.css';
import { useEffect } from "react";


const Employees = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem("employees");
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);
  

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', position: '', department: '', status: 'Active' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const openAddModal = () => {
    setFormData({ name: '', position: '', department: '', status: 'Active' });
    setEditMode(false);
    setShowModal(true);
  };

  const openEditModal = (employee) => {
    setFormData(employee);
    setEditMode(true);
    setEditId(employee.id);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedEmployees = employees.map((emp) =>
        emp.id === editId ? { ...formData, id: editId } : emp
      );
      setEmployees(updatedEmployees);
    } else {
      const newEmployee = {
        id: employees.length + 1,
        ...formData,
      };
      setEmployees([...employees, newEmployee]);
    }
    setShowModal(false);
    setFormData({ name: '', position: '', department: '', status: 'Active' });
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>
                  <span className={`status ${emp.status.toLowerCase().replace(" ", "-")}`}>
                    {emp.status}
                  </span>
                </td>
                <td>
                  <button className="edit-btn" onClick={() => openEditModal(emp)}>Edit</button>
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