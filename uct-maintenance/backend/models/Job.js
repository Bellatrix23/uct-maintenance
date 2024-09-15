const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  description: { type: String, required: true },
  location: { type: String, required: true },
  priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
  status: {
    type: String,
    enum: ["Submitted", "In Progress", "Completed"],
    default: "Submitted",
  },
  submittedDate: { type: Date, default: Date.now },
  isArchived: { type: Boolean, default: false },
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
