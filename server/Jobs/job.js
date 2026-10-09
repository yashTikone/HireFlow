const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    employmentType:{
        type:String,
        enum: ['Full-time','Part-time','Internship'],
        required:true
    },
    salary:{
        type:String
    },
    skills:{
        type:[String],
        required:true
    },
    experienceRequired:{
        type:Number,
        default:0
    },
    recruiter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    status:{
        type:String,
        enum: ['open','closed'],
        default:'open'
    }
},{
    timestamps:true
});
const Job = mongoose.model('Job',jobSchema);
module.exports = Job;