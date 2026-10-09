const isValidUrl = (value) =>{
    try {
        new URL(value);
        return true;
    } catch{
        return false;
    }
};
const validateProfile = (req,res,next)=>{
    const {about,education,experience,projects,resume,location,linkedIn,github} = req.body
    if(about && typeof about !=='string'){
        return res.status(400).json({
            message : 'About must be a string'
        });
    }
    if(about && about.length > 500){
        return res.status(400).json({
            message : 'About must not exceed 500 characters'
        });
    }
    if(education && typeof education !=='string'){
        return res.status(400).json({
            message: 'Education must be a string'
        });
    }
    if(education && education.length > 200){
        return res.status(400).json({
            message : 'Education must not exceed 200 characters'
        });
    }
    if(experience && typeof experience !== 'string'){
        return res.status(400).json({
            message : 'Experience must be a string'
        });
    }
    if (experience && experience.length > 500) {
        return res.status(400).json({
            message: 'Experience must not exceed 500 characters'
        });
    }
    if(projects && !Array.isArray(projects)){
        return res.status(400).json({
            message : 'Projects must be an array'
        });
    }
    if(projects){
        for(const project of projects){
            if(typeof project !=='string'){
                return res.status(400).json({
                    message : 'Each project must be a string'
                });
            }
            if (project.length > 100) {
                return res.status(400).json({
                    message: 'Each project name must not exceed 100 characters'
                });
            }            
        }
    }
    if(resume && typeof resume !=='string'){
        return res.status(400).json({
            message : 'Resume must be a string'
        });
    }
    if(location && typeof location !=='string'){
        return res.status(400).json({
            message : 'Location must be a string'
        });
    }
    if (location && location.length > 100) {
        return res.status(400).json({
            message: 'Location must not exceed 100 characters'
        });
    }
    if(linkedIn && typeof linkedIn !== 'string'){
        return res.status(400).json({
            message : 'LinkedIn must be a string'
        });
    }
    if(linkedIn && !isValidUrl(linkedIn)){
        return res.status(400).json({
            message : 'Invalid LinkedIn URL'
        });
    }
    if(github && typeof github !=='string'){
        return res.status(400).json({
            message : 'GitHub must be a string'
        });
    }
    if(github && !isValidUrl(github)){
        return res.status(400).json({
            message:'Invalid Github URL'
        });
    }
    next();
};
module.exports = validateProfile;