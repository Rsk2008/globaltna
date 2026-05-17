const JobRequest = require('../models/JobRequest');

const getAllJobs = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.status) filter.status = req.query.status;
    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

const createJob = async (req, res, next) => {
  try {
    const { title, description, category, location, contactName, contactEmail } = req.body;
    const job = await JobRequest.create({ title, description, category, location, contactName, contactEmail });
    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
};

const updateJobStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['Open', 'In Progress', 'Closed'];
    if (!status || !allowed.includes(status)) {
      return res.status(400).json({ message: `status must be one of: ${allowed.join(', ')}` });
    }
    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllJobs, getJobById, createJob, updateJobStatus, deleteJob };
