import { useEffect, useState } from "react";
import "./Recruitment.css";
import { FaArrowLeft, FaBriefcase, FaUsers, FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Recruitment = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/applications"); // Make sure your backend has this endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobOpenings(data.jobs); // Make sure your backend returns { jobs: [...] }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (jobId, status) => {
    if (status === "Open") {
      navigate(`/apply/${jobId}`);
    }
  };

  if (loading) {
    return <div className="recruitment-container">Loading jobs...</div>;
  }

  if (error) {
    return <div className="recruitment-container">Error: {error}</div>;
  }

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
        {jobOpenings.length > 0 ? (
          jobOpenings.map((job) => (
            <div key={job._id} className="job-card">
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
                onClick={() => handleApply(job._id, job.status)}
              >
                {job.status === "Open" ? "Apply Now" : "Closed"}
              </button>
            </div>
          ))
        ) : (
          <div>No job openings available.</div>
        )}
      </div>
    </div>
  );
};

export default Recruitment;
