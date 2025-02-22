import React, { useState } from "react";
import "./questions.css";

const Questions = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    firstLastName: "",
    schoolEmail: "",
    universityYear: "",
    concentration: "",
    preferredWork: "",
    jobType: "",
    jobDuration: "",
    keywords: "",
    achievements: "",
    freeTime: "",
    inspiration: "",
  });

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  return (
    <div className="phone-container">
      {step === 1 && (
        <div className="question-box">
          <h2>Hi! What is your name?</h2>
          <input
            type="text"
            placeholder="Ex: Jon Doe"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="name-input"
          />
          <button onClick={handleNext} className="next-button">
            Next →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="question-box">
          <h2>Your Academics</h2>
          <input
            type="text"
            placeholder="First/Last Name"
            value={formData.firstLastName}
            onChange={(e) =>
              setFormData({ ...formData, firstLastName: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="School email (must be @___.edu)"
            value={formData.schoolEmail}
            onChange={(e) =>
              setFormData({ ...formData, schoolEmail: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="University and year"
            value={formData.universityYear}
            onChange={(e) =>
              setFormData({ ...formData, universityYear: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Concentration (N/A if undeclared)"
            value={formData.concentration}
            onChange={(e) =>
              setFormData({ ...formData, concentration: e.target.value })
            }
          />
          <button onClick={handleNext} className="next-button">
            Next →
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="question-box">
          <h2>Preferences</h2>
          <select
            value={formData.preferredWork}
            onChange={(e) =>
              setFormData({ ...formData, preferredWork: e.target.value })
            }
          >
            <option value="">Preferred means of work (remote / on-site / hybrid)</option>
            <option value="remote">Remote</option>
            <option value="on-site">On-site</option>
            <option value="hybrid">Hybrid</option>
          </select>
          <select
            value={formData.jobType}
            onChange={(e) =>
              setFormData({ ...formData, jobType: e.target.value })
            }
          >
            <option value="">Would you like a job on-campus or in the industry?</option>
            <option value="on-campus">On-campus</option>
            <option value="industry">Industry</option>
          </select>
          <select
            value={formData.jobDuration}
            onChange={(e) =>
              setFormData({ ...formData, jobDuration: e.target.value })
            }
          >
            <option value="">
              Are you looking for a temporary job (ex. internship) or a long-term commitment?
            </option>
            <option value="temporary">Temporary (internship)</option>
            <option value="long-term">Long-term</option>
          </select>
          <input
            type="text"
            placeholder="Please enter 7 keywords that best describe your interests"
            value={formData.keywords}
            onChange={(e) =>
              setFormData({ ...formData, keywords: e.target.value })
            }
          />
          <button onClick={handleNext} className="next-button">
            Next →
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="question-box">
          <h2>About You</h2>
          <textarea
            placeholder="Provide 3 examples (one per line) of your top achievements (this can be anything and does not have to be school or career-based)"
            value={formData.achievements}
            onChange={(e) =>
              setFormData({ ...formData, achievements: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="In one sentence describe what you like to do in your free time"
            value={formData.freeTime}
            onChange={(e) =>
              setFormData({ ...formData, freeTime: e.target.value })
            }
          />
          <textarea
            placeholder="What inspired you to pursue a career in this field or pursue your concentration?"
            value={formData.inspiration}
            onChange={(e) =>
              setFormData({ ...formData, inspiration: e.target.value })
            }
          />
          <button className="submit-button">Submit</button>
        </div>
      )}
    </div>
  );
};

export default Questions;
