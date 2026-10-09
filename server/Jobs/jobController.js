const Job = require('./job');

const createJob = async (req, res) => {
  const { title, description, company, location, employmentType, salary, skills, experienceRequired } = req.body;
  const job = await Job.create({ title, description, company, location, employmentType, salary, skills, experienceRequired, recruiter: req.user.id });
  res.status(201).json({ message: 'Job created successfully', job });
};

const getJobs = async (req, res) => {
  const jobs = await Job.find({ status: 'open' }).sort({ createdAt: -1 }).populate('recruiter', 'name email currentCompany');
  res.json({ count: jobs.length, jobs });
};

const getMyJobs = async (req, res) => {
  const jobs = await Job.find({ recruiter: req.user.id }).sort({ createdAt: -1 });
  res.json({ count: jobs.length, jobs });
};

const getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id).populate('recruiter', 'name email currentCompany');
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json({ job });
};

const updateJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  if (job.recruiter.toString() !== req.user.id) return res.status(403).json({ message: 'You can only update your own job' });
  const fields = ['title','description','company','location','employmentType','salary','skills','experienceRequired'];
  fields.forEach((field) => { if (req.body[field] !== undefined) job[field] = req.body[field]; });
  await job.save();
  res.json({ message: 'Job updated successfully', job });
};

const closeJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  if (job.recruiter.toString() !== req.user.id) return res.status(403).json({ message: 'You can only close your own job' });
  job.status = 'closed';
  await job.save();
  res.json({ message: 'Job closed successfully', job });
};

const deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  if (job.recruiter.toString() !== req.user.id) return res.status(403).json({ message: 'You can only delete your own job' });
  await Job.deleteOne({ _id: req.params.id });
  res.json({ message: 'Job deleted successfully' });
};

module.exports = { createJob, getJobs, getMyJobs, getJobById, updateJob, closeJob, deleteJob };
