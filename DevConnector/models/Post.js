const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
//the post refers the referral posted by workers or the asked referrals posted by students
//so the post should contain the Referral Profile
//所以可以理解为一张张卡片 
const PostSchema = new Schema({
    poster : {
        type : Schema.Types.ObjectId,
        ref: 'User'
    },
    text : {
        type : String,
        required: true
    },
    title :{
        type : String
    },
    avatar: {
        type : String
    }, 
    like : [
        { user :{
        type : Schema.Types.ObjectId,
        ref :'user'}
        }
    ],
    comments: [
        {
            user: {
                type : Schema.Types.ObjectId,
                ref: 'users'
            },
            text :{
                type:String,
                required : true
            },
            name : {
                type : String
            },
            date :{
                type : Date,
                default : Date.now
            }
        }
    ]
});

module.exports = Post = mongoose.model('post', PostSchema);