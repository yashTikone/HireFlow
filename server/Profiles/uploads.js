const multer = require('multer');
const path = require('path');
const fs = require('fs');
const resumeDirectory = path.join(__dirname, '..', 'uploads', 'resumes');
const photoDirectory = path.join(__dirname, '..', 'uploads', 'profile-photos');
fs.mkdirSync(resumeDirectory, { recursive: true });
fs.mkdirSync(photoDirectory, { recursive: true });

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, resumeDirectory);
    },
    filename:(req,file,cb)=>{
        const uniqueName = Date.now() + '-' + file.originalname;

        cb(null,uniqueName);
    }
});
const upload = multer({
    storage : storage,
    limits: {
        fileSize : 5*1024*1024
    },
    fileFilter : (req,file,cb)=>{
        if(file.mimetype ==='application/pdf'){
            cb(null,true)
        } else{
            cb(new Error('Only PDF files are allowed'))
        }
    }
});
const photoStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, photoDirectory);
    },
    filename: (req,file,cb)=>{
        const uniqueName = Date.now()+ '-' + file.originalname;
        cb(null,uniqueName);
    }
});
const photoUpload = multer({
    storage : photoStorage,

    limits: {
        fileSize: 2*1024*1024
    },
    fileFilter: (req,file,cb)=>{
        if(
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/webp'
        ) {
            cb(null,true);
        } else{
            cb(new Error('Only JPG,PNG and Webp images are allowed'))
        }
    }
});
module.exports = {
    resumeUpload : upload,
    photoUpload
};