const express = require('express')
const {protect} = require('../Authentication/authMiddleware');
const {createProfile,getProfile,updateProfile,deleteProfile,uploadResume,uploadProfilePhoto} = require('./profile');
const validateProfile = require('./profileValidation');
const {resumeUpload,photoUpload} = require('./uploads')


const router = express.Router();
router.post('/',protect,validateProfile,createProfile);
router.get('/',protect, getProfile)
router.put('/',protect,validateProfile,updateProfile)
router.delete('/',protect,deleteProfile)
router.post('/resume',protect,resumeUpload.single('resume'),uploadResume)
router.post('/photo',protect,photoUpload.single('photo'),uploadProfilePhoto)

module.exports = router;