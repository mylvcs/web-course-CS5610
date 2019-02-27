const mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost:27017/web-referral-app");
const Schema = mongoose.Schema;

//all user common 
//用户名
const UserSchema = new Schema({
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
        required: false
    },
    studentOrNot : {
        type: Boolean,
        default : false
    },
    date :{
        type : Date, 
        default : Date.now
    }
});
module.exports = User = mongoose.model('users', UserSchema);