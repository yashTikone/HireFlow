const mongoose =  require('mongoose')
const profileSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required: true,
        unique: true
    },
    about : {
        type : String,
        trim : true
    },
    education : {
        type : String
    },
    experience : {
        type : String
    },
    projects : {
        type : [String]
    },
    resume : {
        type : String
    },
    profilePhoto : {
        type : String
    },
    location : {
        type : String
    },
    linkedIn : {
        type : String
    },
    github : {
        type:   String
    },

},{
    timestamps : true
});
const profile = mongoose.model('Profile',profileSchema);
module.exports = profile;

