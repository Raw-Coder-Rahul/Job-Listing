import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, position, companyId, experience } = req.body;
    const userId = req.userId;

    if (!title || !description || !requirements || !salary || !companyId || !experience || !jobType || !position || !location) {
      return res.status(400).json({ message: "Please fill all the fields", success: false });
    }

    const job = new Job({
      title,
      description,
      requirements: requirements.split(",").map(r => r.trim()),
      salary,
      location,
      jobType,
      position,
      company: companyId,
      experience,
      created_by: userId,
    });

    await job.save();

    return res.status(201).json({ message: "Job posted successfully", success: true, job });
  } catch (error) {
    console.error("Post job error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate("company", "name description")
      .sort({ createdAt: -1 });

    if (!jobs.length) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error("Get all jobs error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate("company", "name description");
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error("Get job by ID error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const userId = req.userId;

    const jobs = await Job.find({ created_by: userId }).populate("company", "name description");
    if (!jobs.length) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error("Get admin jobs error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};