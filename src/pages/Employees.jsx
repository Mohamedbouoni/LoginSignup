import { useState, useEffect } from 'react';
import './Employees.css';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    // Fetch employees from the backend API
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEdit = (employee) => {
    setIsEditing(true);
    setCurrentEmployee(employee);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${currentEmployee.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentEmployee),
      });

      if (response.ok) {
        const updatedEmployees = employees.map((emp) =>
          emp.id === currentEmployee.id ? currentEmployee : emp
        );
        setEmployees(updatedEmployees);
        setIsEditing(false);
        setCurrentEmployee(null);
      }
    } catch (error) {
      console.error('Error saving employee data:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentEmployee(null);
  };

  return (
    <div className="employee-management">
      <h2>Employee Management</h2>

      <div className="employee-list">
        {employees.map((employee) => (
          <div key={employee.id} className="employee-card">
            <h3>{employee.name}</h3>
            <p>Department: {employee.department}</p>
            <p>Email: {employee.email}</p>
            <p>Phone: {employee.phone}</p>
            <button onClick={() => handleEdit(employee)}>Edit</button>
          </div>
        ))}
      </div>

      {isEditing && currentEmployee && (
        <div className="employee-edit-form">
          <h3>Edit Employee</h3>
          <label>
            Name:
            <input
              type="text"
              value={currentEmployee.name}
              onChange={(e) => setCurrentEmployee({ ...currentEmployee, name: e.target.value })}
            />
          </label>
          <label>
            Department:
            <input
              type="text"
              value={currentEmployee.department}
              onChange={(e) => setCurrentEmployee({ ...currentEmployee, department: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={currentEmployee.email}
              onChange={(e) => setCurrentEmployee({ ...currentEmployee, email: e.target.value })}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              value={currentEmployee.phone}
              onChange={(e) => setCurrentEmployee({ ...currentEmployee, phone: e.target.value })}
            />
          </label>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Employees;
