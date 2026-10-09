const express =require('express');
const {protect,authorize} = require('../Authentication/authMiddleware');
const {applyForJob,getMyApplications,getJobApplications,updateApplicationStatus} = require('./applicationController');
const { analyzeApplication } = require('./matchingController');

const router = express.Router();

router.get(
    '/my',
    protect,
    authorize('candidate'),
    getMyApplications
);
router.get(
    '/job/:jobId',
    protect,
    authorize('recruiter'),
    getJobApplications
);
router.post(
    '/:applicationId/analyze',
    protect,
    authorize('recruiter'),
    analyzeApplication
);
router.patch(
    '/:applicationId/status',
    protect,
    authorize('recruiter'),
    updateApplicationStatus
)
router.post(
    '/:jobId',
    protect,
    authorize('candidate'),
    applyForJob
);
module.exports = router;