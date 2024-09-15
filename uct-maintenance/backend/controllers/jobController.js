const Job = require("../models/Job");

// Create a new job
const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create job. Please check your inputs!" });
  }
};

// Get all jobs, ordered by status and date submitted
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isArchived: false }).sort({
      status: 1,
      submittedDate: 1,
    });
    res.json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching jobs, please try again later." });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!job) return res.status(404).json({ message: "Job not found!" });
    res.json(job);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update job. Check the provided details." });
  }
};

// Batch update job statuses
const updateMultipleJobs = async (req, res) => {
  try {
    const { ids, status } = req.body;
    await Job.updateMany({ _id: { $in: ids } }, { status });
    res.json({ message: "Jobs updated successfully" });
  } catch (error) {
    res.status(400).json({
      message:
        "Failed to update jobs. Please ensure IDs and statuses are correct.",
    });
  }
};

// Archive a job
const archiveJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { isArchived: true },
      { new: true }
    );
    if (!job)
      return res.status(404).json({ message: "Job not found to archive!" });
    res.json(job);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to archive job. Please try again." });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  updateJob,
  updateMultipleJobs,
  archiveJob,
};
