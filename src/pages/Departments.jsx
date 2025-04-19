import { Link } from "react-router-dom";
import { FaUsers, FaUserTie, FaArrowLeft } from "react-icons/fa";
import "./Departments.css"; // Import the CSS file for styling

const Departments = () => {
  const departments = [
    { id: 1, name: "Human Resources", employees: 15, head: "John Doe" },
    { id: 2, name: "Finance", employees: 10, head: "Jane Smith" },
    { id: 3, name: "Engineering", employees: 30, head: "Alice Johnson" },
    { id: 4, name: "Marketing", employees: 12, head: "Bob Williams" },
  ];

  return (
    <div className="departments-container">
      {/* Back Button */}
      <div className="back-button-container">
        <Link to="/dashboard" className="back-button">
          <FaArrowLeft className="back-icon" />
          Back to Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="departments-header">
        <h2 className="departments-title">Departments Overview</h2>
        <p className="departments-subtitle">
          A list of all company departments and their heads.
        </p>
      </div>

      {/* Grid */}
      <div className="departments-grid">
        {departments.map((dept) => (
          <div key={dept.id} className="department-card">
            <div className="icon-container">
              <FaUsers className="department-icon" />
            </div>
            <h3 className="department-name">{dept.name}</h3>

            <div className="department-info">
              <FaUsers className="info-icon" />
              <span>{dept.employees} Employees</span>
            </div>

            <div className="department-info">
              <FaUserTie className="info-icon" />
              <span>Head: {dept.head}</span>
            </div>

            {/* View Details Link */}
            <Link to={`/department-details/${dept.id}`} className="view-button">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;