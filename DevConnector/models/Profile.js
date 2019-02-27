const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//内推 should have info like email, company, location, details, yuoxiaoqi, FT/intern
const ProfileSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref: 'users'
    },
    //what is handle
    handle: {
        type: String,
        required: true,
        max : 40
    },
    company : {
        type: String,
        required : true
    },
    
    location: {
        type: String,
        required : true
    },
    jobTitle : {
        //NG,or intern/ or 跳槽 
        type: [String],
        required : true
    }, 

    details : {
        type: String,
    },
    date : {
        type : Date,
        default : Date.now
    },
    youxiaoqi: {
        type : Date, 
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);