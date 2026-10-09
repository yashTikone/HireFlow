const mongoose = require('mongoose');
const applicationSchema = new mongoose.Schema({
    candidate : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required : true
    },
    recruiter:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required : true
    },
    status:{
        type:String,
        enum : [
            'Applied',
            'Under Review',
            'Shortlisted',
            'Interview',
            'Selected',
            'Rejected'
        ],
        default: 'Applied'
    },
    coverLetter : {
        type :String
    }
    
}, {
    timestamps:true
});
const Application = mongoose.model('Application',applicationSchema);
module.exports = Application;