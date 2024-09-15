import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Form, Dropdown, Row, Col } from "react-bootstrap";
import EditJobModal from "./EditJobModal";

// Component to display and manage a list of jobs
const JobList = ({ jobs, setJobs }) => {
  const [selectedJobs, setSelectedJobs] = useState([]); // Track selected jobs for batch operations
  const [editModalShow, setEditModalShow] = useState(false); // Control the display of the edit modal
  const [currentJob, setCurrentJob] = useState(null); // Track the job being edited
  const [filterStatus, setFilterStatus] = useState("All"); // Filter jobs by status
  const [filterPriority, setFilterPriority] = useState("All"); // Filter jobs by priority
  const [selectAll, setSelectAll] = useState(false); // Toggle select all functionality

  // Fetch jobs from the server when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs");
        setJobs(response.data);
      } catch (error) {
        alert("Error fetching jobs: " + error.message);
      }
    };
    fetchJobs();
  }, [setJobs]);

  // Archive a specific job
  const handleArchive = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/jobs/${id}/archive`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id)); // Remove archived job from the list
    } catch (error) {
      alert("Error archiving job: " + error.response.data.message);
    }
  };

  // Update the status of selected jobs
  const updateJobStatus = async (ids, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/jobs/batch-update`, {
        ids: ids,
        status: newStatus,
      });
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          ids.includes(job._id) ? { ...job, status: newStatus } : job
        )
      );
      setSelectedJobs([]);
      setSelectAll(false);
    } catch (error) {
      alert("Error updating job status: " + error.response.data.message);
    }
  };

  // Toggle the selection of a job
  const toggleJobSelection = (id) => {
    setSelectedJobs((prev) =>
      prev.includes(id) ? prev.filter((jobId) => jobId !== id) : [...prev, id]
    );
  };

  // Handle select all functionality
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(filteredJobs.map((job) => job._id));
    }
    setSelectAll(!selectAll);
  };

  // Open the edit modal for a specific job
  const handleEdit = (job) => {
    setCurrentJob(job);
    setEditModalShow(true);
  };

  // Update the job details after editing
  const updateJob = async (id, updatedDetails) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/jobs/${id}`,
        updatedDetails
      );
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job._id === id ? response.data : job))
      );
    } catch (error) {
      alert("Error updating job: " + error.response.data.message);
    }
  };

  // Format the date to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleDateString();
  };

  // Filter jobs based on status and priority
  const filteredJobs = jobs.filter((job) => {
    const statusMatch = filterStatus === "All" || job.status === filterStatus;
    const priorityMatch =
      filterPriority === "All" || job.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="job-list">
      <h2>Job List</h2>
      <Row className="mb-3">
        <Col className="d-flex align-items-center">
          <Button
            variant={selectAll ? "danger" : "primary"}
            onClick={handleSelectAll}
            className="me-2"
          >
            {selectAll ? "Deselect All" : "Select All"}
          </Button>

          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-mark-all"
              disabled={selectedJobs.length === 0}
            >
              Mark All As...
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => updateJobStatus(selectedJobs, "In Progress")}
              >
                In Progress
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => updateJobStatus(selectedJobs, "Completed")}
              >
                Completed
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <Dropdown className="me-2">
            <Dropdown.Toggle variant="secondary" id="dropdown-status-filter">
              Filter Status: {filterStatus}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFilterStatus("All")}>
                All
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterStatus("Submitted")}>
                Submitted
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterStatus("In Progress")}>
                In Progress
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterStatus("Completed")}>
                Completed
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-priority-filter">
              Filter Priority: {filterPriority}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFilterPriority("All")}>
                All
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterPriority("High")}>
                High
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterPriority("Medium")}>
                Medium
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterPriority("Low")}>
                Low
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {filteredJobs.map((job) => (
        <Card key={job._id} className="mb-3">
          <Card.Body className="d-flex align-items-start">
            <Form.Check
              type="checkbox"
              className="me-2"
              checked={selectedJobs.includes(job._id)}
              onChange={() => toggleJobSelection(job._id)}
              style={{ marginTop: "4px" }}
            />
            <div
              className="job-details"
              style={{ marginLeft: "10px", flex: 1 }}
            >
              {/* Display job details */}
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    minWidth: "110px",
                    marginBottom: "4px",
                    textAlign: "right",
                  }}
                >
                  <strong>Description:</strong>
                </p>
                <p style={{ marginLeft: "10px", marginBottom: "4px" }}>
                  {job.description}
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    minWidth: "110px",
                    marginBottom: "4px",
                    textAlign: "right",
                  }}
                >
                  <strong>Location:</strong>
                </p>
                <p style={{ marginLeft: "10px", marginBottom: "4px" }}>
                  {job.location}
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    minWidth: "110px",
                    marginBottom: "4px",
                    textAlign: "right",
                  }}
                >
                  <strong>Priority:</strong>
                </p>
                <p style={{ marginLeft: "10px", marginBottom: "4px" }}>
                  {job.priority}
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    minWidth: "110px",
                    marginBottom: "4px",
                    textAlign: "right",
                  }}
                >
                  <strong>Date:</strong>
                </p>
                <p style={{ marginLeft: "10px", marginBottom: "4px" }}>
                  {formatDate(job.submittedDate)}
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    minWidth: "110px",
                    marginBottom: "0px",
                    textAlign: "right",
                  }}
                >
                  <strong>Status:</strong>
                </p>
                <p style={{ marginLeft: "10px", marginBottom: "0px" }}>
                  {job.status}
                </p>
              </div>
              <div className="mt-3 d-flex align-items-start">
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEdit(job)}
                >
                  Edit Job
                </Button>
                <Button
                  variant="success"
                  className="me-2"
                  onClick={() => updateJobStatus([job._id], "In Progress")}
                >
                  Mark as In Progress
                </Button>
                <Button
                  variant="info"
                  className="me-2"
                  onClick={() => updateJobStatus([job._id], "Completed")}
                >
                  Mark as Completed
                </Button>
                <Button variant="danger" onClick={() => handleArchive(job._id)}>
                  Archive Job
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
      {currentJob && (
        <EditJobModal
          job={currentJob}
          show={editModalShow}
          handleClose={() => setEditModalShow(false)}
          updateJob={updateJob}
        />
      )}
    </div>
  );
};

export default JobList;
