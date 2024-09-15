import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Container } from "react-bootstrap";

// Form component for submitting new jobs
const JobForm = ({ setJobs }) => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("");

  // Handle form submission to add a new job
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/jobs", {
        description,
        location,
        priority,
      });
      setJobs((prevJobs) => [...prevJobs, response.data]); // Update the job list with the new job
      // Clear form fields after submission
      setDescription("");
      setLocation("");
      setPriority("");
    } catch (error) {
      alert("Error creating job: " + error.response.data.message);
    }
  };

  return (
    <Container
      className="p-4 my-4 border rounded bg-light shadow-sm"
      style={{ maxWidth: "1000px" }}
    >
      <h2 className="text-center mb-4">Submit a New Job</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter job description"
            value={description}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Enter job description")}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="text-center"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter job location"
            value={location}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Enter job location")}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="text-center"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control
            as="select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
            className="text-center"
          >
            <option value="" disabled hidden>
              Select an option
            </option>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </Form.Control>
        </Form.Group>

        <div className="text-center">
          <Button type="submit" variant="primary" className="px-4 py-2">
            Submit Job
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default JobForm;
