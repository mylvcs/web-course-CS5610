const mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost:27017/web-referral-app");
const Schema = mongoose.Schema;

//Student Schema
const StudentSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: true
    },
    studentOrNot : {
        type: Boolean,
        default : true
    },
    date :{
        type : Date, 
        default : Date.now
    }
});
module.exports = User = mongoose.model('users', UserSchema);