const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    role:{
        type:String,
        enum: ['candidate','recruiter'],
        required: true
    },
    phone:{
        type: String
    },
    skills:{
        type:[String]
    },
    experience:{
        type: Number
    },
    currentCompany:{
        type: String
    }


});
const user = mongoose.model('user',userSchema);
module.exports = user;