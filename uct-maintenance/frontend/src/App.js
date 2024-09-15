import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import "./App.css";
import UCTBanner from "./images/UCTbanner.png";
import Footer from "./components/Footer";

const App = () => {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from the server when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs");
        setJobs(response.data); // Set the jobs state with the fetched data
      } catch (error) {
        alert("Error fetching jobs: " + error.message);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <img src={UCTBanner} alt="UCT Banner" className="header-logo" />
        <h1>UCT Campus Maintenance and Repairs</h1>
        <p>A division of the University of Cape Town</p>
      </header>
      {/* Form to submit new jobs */}
      <JobForm setJobs={setJobs} />
      {/* List of existing jobs */}
      <JobList jobs={jobs} setJobs={setJobs} />
      {/* Footer with disclaimer */}
      <Footer />
    </div>
  );
};

export default App;
