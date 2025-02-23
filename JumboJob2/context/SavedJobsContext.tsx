import React, { createContext, useContext, useState, ReactNode } from "react";

interface Job {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  workMode: string;
  employmentType: string;
  pay: string;
  description: string;
}

interface SavedJobsContextType {
  savedJobs: Job[];
  saveJob: (job: Job) => void;
  removeJob: (jobId: string) => void;
}

const SavedJobsContext = createContext<SavedJobsContextType | undefined>(undefined);

export const SavedJobsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  const saveJob = (job: Job) => {
    setSavedJobs((prevJobs) => {
      if (!prevJobs.some((j) => j.id === job.id)) {
        return [...prevJobs, job]; // Add job if it's not already saved
      }
      return prevJobs;
    });
  };

  const removeJob = (jobId: string) => {
    setSavedJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  return (
    <SavedJobsContext.Provider value={{ savedJobs, saveJob, removeJob }}>
      {children}
    </SavedJobsContext.Provider>
  );
};

export const useSavedJobs = () => {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error("useSavedJobs must be used within a SavedJobsProvider");
  }
  return context;
};
