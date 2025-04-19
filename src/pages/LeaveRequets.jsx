import React from "react";
import "./LeaveRequests.css";
import { FaArrowLeft, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const LeaveRequests = () => {
  const leaveRequests = [
    {
      id: 1,
      employee: "John Doe",
      department: "Human Resources",
      from: "2025-03-01",
      to: "2025-03-05",
      reason: "Vacation",
      status: "Approved",
    },
    {
      id: 2,
      employee: "Jane Smith",
      department: "Finance",
      from: "2025-03-10",
      to: "2025-03-15",
      reason: "Medical Leave",
      status: "Pending",
    },
    {
      id: 3,
      employee: "Alice Johnson",
      department: "Engineering",
      from: "2025-03-20",
      to: "2025-03-22",
      reason: "Personal",
      status: "Rejected",
    },
  ];

  return (
    <div className="leave-container">
      {/* Back Button */}
      <div className="back-button-container">
        <Link to="/dashboard" className="back-button">
          <FaArrowLeft className="back-icon" />
          Back to Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="leave-header">
        <h2 className="leave-title">Leave Requests</h2>
        <p className="leave-subtitle">Manage and review employee leave requests.</p>
      </div>

      {/* Table */}
      <div className="leave-table-container">
        <table className="leave-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.employee}</td>
                <td>{request.department}</td>
                <td>{request.from}</td>
                <td>{request.to}</td>
                <td>{request.reason}</td>
                <td>
                  <span className={`status-badge ${request.status.toLowerCase()}`}>
                    {request.status}
                  </span>
                </td>
                <td>
                  <button className="action-button approve">
                    <FaCheckCircle className="action-icon" /> Approve
                  </button>
                  <button className="action-button reject">
                    <FaTimesCircle className="action-icon" /> Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveRequests;