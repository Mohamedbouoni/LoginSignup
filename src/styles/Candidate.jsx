import "./candidate.css"; // Ensure this file is in the same folder

export default function Candidate() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero">
        <h1>Find Your Dream Job</h1>
        <p>Apply to top companies and take the next step in your career</p>
        <button className="hero-btn">Browse Jobs</button>
      </div>

      {/* Job Listings */}
      <div className="job-listings">
        <h2>Latest Job Openings</h2>
        <div className="job-card">
          <h3>Frontend Developer</h3>
          <p>Company: Tech Corp</p>
          <p>Location: Remote</p>
          <button className="apply-btn">Apply Now</button>
        </div>
        <div className="job-card">
          <h3>Data Scientist</h3>
          <p>Company: AI Solutions</p>
          <p>Location: San Francisco, CA</p>
          <button className="apply-btn">Apply Now</button>
        </div>
        <div className="job-card">
          <h3>UX/UI Designer</h3>
          <p>Company: Creative Agency</p>
          <p>Location: New York, NY</p>
          <button className="apply-btn">Apply Now</button>
        </div>
      </div>

      {/* Apply Now Section */}
     
    </div>
  );
}
