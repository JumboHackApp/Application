import React, { useState } from "react";
import "./questions.css";

const Questions = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    schoolEmail: "",
    university: "",
    graduationYear: "",
    major: "",
  });

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="phone-container">
      <div className="question-box">
        {step === 1 && (
          <>
            <h2>Hi! What is your name?</h2>
            <p className="subtext">Please enter your first and last name</p> {/* Add this with class */}
            <input
              type="text"
              placeholder="Ex: John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="name-input"
            />
          </>
        )}

        {step === 2 && (
          <>
            <h2>What is your school email?</h2>
            <input
              type="email"
              placeholder="Ex: john.doe@tufts.edu"
              value={formData.schoolEmail}
              onChange={(e) =>
                setFormData({ ...formData, schoolEmail: e.target.value })
              }
              className="name-input"
            />
          </>
        )}

        {step === 3 && (
          <>
            <h2>What school do you go to?</h2>
            <input
              type="text"
              placeholder="Ex: Tufts University"
              value={formData.university}
              onChange={(e) =>
                setFormData({ ...formData, university: e.target.value })
              }
              className="name-input"
            />
          </>
        )}

        {step === 4 && (
          <>
            <h2>What year is your graduation?</h2>
            <input
              type="text"
              placeholder="Ex: 2027"
              value={formData.graduationYear}
              onChange={(e) =>
                setFormData({ ...formData, graduationYear: e.target.value })
              }
              className="name-input"
            />
          </>
        )}

        {step === 5 && (
          <>
            <h2>What is your major?</h2>
            <input
              type="text"
              placeholder="Ex: Computer Science"
              value={formData.major}
              onChange={(e) =>
                setFormData({ ...formData, major: e.target.value })
              }
              className="name-input"
            />
          </>
        )}
        {step === 6 && (
        <>
            <h2>Almost there!</h2>
            <p className="subtext">Now let's enter your job preferences</p>
        </>
        )}

        {step === 7 && (
        <>
            <h2>What is your preferred means of work?</h2>
            <p className="subtext">(remote / on-site / hybrid)</p>
            <input
            type="text"
            placeholder="Ex: On-site"
            value={formData.preferredWork}
            onChange={(e) =>
                setFormData({ ...formData, preferredWork: e.target.value })
            }
            className="name-input"
            />
        </>
        )}

        {step === 8 && (
        <>
            <h2>Would you like a job on-campus or in the industry?</h2>
            <input
            type="text"
            placeholder="Ex: On-campus"
            value={formData.jobLocation}
            onChange={(e) =>
                setFormData({ ...formData, jobLocation: e.target.value })
            }
            className="name-input"
            />
        </>
        )}

        {step === 9 && (
        <>
            <h2>Are you looking for an internship or a full-time job?</h2>
            <input
            type="text"
            placeholder="Ex: Internship"
            value={formData.jobType}
            onChange={(e) =>
                setFormData({ ...formData, jobType: e.target.value })
            }
            className="name-input"
            />
        </>
        )}

        {step === 10 && (
        <>
            <h2>Enter 7 keywords that best describe your interests</h2>
            <input
            type="text"
            placeholder="Ex: Front-end developer"
            value={formData.keywords}
            onChange={(e) =>
                setFormData({ ...formData, keywords: e.target.value })
            }
            className="name-input"
            />
        </>
        )}

        {step === 11 && (
        <>
            <h2>You're All Set!</h2>
            <p className="subtext">Make sure to complete setting up your profile</p>
            <button className="done-button">Done</button>
        </>
        )}


        

        <button
          onClick={handleNext}
          className="next-button"
          style={{ visibility: step === 11? "hidden" : "visible" }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Questions;
