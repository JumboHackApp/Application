import React, { useState } from "react";
import axios from "axios";

const MatchJobs = () => {
  const [resumeText, setResumeText] = useState("");
  const [location, setLocation] = useState("Remote");
  const [jobResults, setJobResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/match-jobs/", {
        resume_text: resumeText,
        location: location
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      setJobResults(response.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Upload Resume and Find Jobs</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="6"
          placeholder="Paste your resume here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Enter Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Find Jobs</button>
      </form>

      {loading && <p>Loading job listings...</p>}

      {jobResults && (
        <div>
          <h3>Matching Jobs:</h3>
          <ul>
            {jobResults.map((job, index) => (
              <li key={index}>
                <strong>{job.title}</strong> at {job.company}
                <br />
                <a href={job.link} target="_blank" rel="noopener noreferrer">View Job</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MatchJobs;
