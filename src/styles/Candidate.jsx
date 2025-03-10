import "./Candidate.css"; // Ensure this file is in the same folder

export default function Candidate() {
  return (
    <div className="home-container">
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">Horizon</div>
        <div className="nav-links">
          <a href="#hero">Home</a>
          <a href="#job-listings">Jobs</a>
          <a href="#">Contact</a>
          <a href="Login">Login</a>
          <a href="Signup">Sign Up</a>
        </div>
      </div>

      {/* Hero Section */}
      <div id="hero" className="hero">
        <h1 className="hero-title">Unlock Your Future</h1>
        <p className="hero-subtitle">Discover thousands of job opportunities and take control of your career</p>
        <div className="hero-buttons">
          <button className="hero-btn primary">Browse Jobs</button>
          <button className="hero-btn secondary">Upload Resume</button>
        </div>
      </div>

      {/* Job Listings */}
      <div id="job-listings" className="job-listings">
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
    </div>
  );
}