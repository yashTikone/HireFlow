const Application = require('./application');
const Job = require('../Jobs/job');

const applyForJob = async (req, res) => {
  const { coverLetter } = req.body;
  const job = await Job.findById(req.params.jobId);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  if (job.status === 'closed') return res.status(400).json({ message: 'Job is closed' });
  const existing = await Application.findOne({ candidate: req.user.id, job: job._id });
  if (existing) return res.status(400).json({ message: 'You have already applied for this job' });
  const application = await Application.create({ candidate: req.user.id, job: job._id, recruiter: job.recruiter, coverLetter, status: 'Applied' });
  res.status(201).json({ message: 'Application submitted successfully', application });
};

const getMyApplications = async (req, res) => {
  const applications = await Application.find({ candidate: req.user.id })
    .populate('job', 'title company location employmentType salary status')
    .populate('recruiter', 'name email')
    .sort({ createdAt: -1 });
  res.json({ count: applications.length, applications });
};

const getJobApplications = async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  if (job.recruiter.toString() !== req.user.id) return res.status(403).json({ message: 'You can only view applications for your own job' });
  const applications = await Application.find({ job: job._id })
    .populate('candidate', 'name email phone skills experience currentCompany')
    .sort({ createdAt: -1 });
  res.json({ count: applications.length, applications });
};

const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;
  const allowed = ['Applied','Under Review','Shortlisted','Interview','Selected','Rejected'];
  if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid application status' });
  const application = await Application.findById(req.params.applicationId);
  if (!application) return res.status(404).json({ message: 'Application not found' });
  if (application.recruiter.toString() !== req.user.id) return res.status(403).json({ message: 'You can only update applications for your own job' });
  application.status = status;
  await application.save();
  res.json({ message: 'Application status updated successfully', application });
};

module.exports = { applyForJob, getMyApplications, getJobApplications, updateApplicationStatus };
