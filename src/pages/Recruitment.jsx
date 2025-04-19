import React from "react";
import "./Recruitment.css";
import { FaArrowLeft, FaBriefcase, FaUsers, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Recruitment = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Software Engineer",
      department: "Engineering",
      positions: 3,
      status: "Open",
    },
    {
      id: 2,
      title: "HR Specialist",
      department: "Human Resources",
      positions: 1,
      status: "Closed",
    },
    {
      id: 3,
      title: "Marketing Manager",
      department: "Marketing",
      positions: 2,
      status: "Open",
    },
    {
      id: 4,
      title: "Accountant",
      department: "Finance",
      positions: 1,
      status: "Open",
    },
  ];

  return (
    <div className="recruitment-container">
      {/* Back Button */}
      <div className="back-button-container">
        <Link to="/dashboard" className="back-button">
          <FaArrowLeft className="back-icon" />
          Back to Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="recruitment-header">
        <h2 className="recruitment-title">Recruitment Portal</h2>
        <p className="recruitment-subtitle">Manage and review job openings.</p>
      </div>

      {/* Job Openings Grid */}
      <div className="job-grid">
        {jobOpenings.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-icon-container">
              <FaBriefcase className="job-icon" />
            </div>
            <h3 className="job-title">{job.title}</h3>

            <div className="job-info">
              <FaUsers className="info-icon" />
              <span>{job.positions} Position(s)</span>
            </div>

            <div className="job-info">
              <FaCheckCircle className="info-icon" />
              <span>Status: <strong>{job.status}</strong></span>
            </div>

            <button
              className={`apply-button ${job.status === "Closed" ? "disabled" : ""}`}
              disabled={job.status === "Closed"}
            >
              {job.status === "Open" ? "Apply Now" : "Closed"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recruitment;