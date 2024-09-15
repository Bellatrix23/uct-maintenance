const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

router.post("/", jobController.createJob);
router.get("/", jobController.getAllJobs);
router.put("/:id", jobController.updateJob);
router.patch("/batch-update", jobController.updateMultipleJobs);
router.patch("/:id/archive", jobController.archiveJob);

module.exports = router;
