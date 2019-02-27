const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/web-referral-app');
const Schema = mongoose.Schema;


//const StudentProfile = mongoose.model('');
//const WorkerProfile = mongoose.model('');
// Create Schema
//Done by Zhou
const User = mongoose.model('User', UserSchema);

const StudentProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	name:{
		type: String,
        require: true,
	},
	email:{
		type: String,
		require: true
	},
	education:[
		{
			school:{
				type: String,
				require: true
			},
			degree:{
				type: String,
				require: true
			},
			major: {
				type: String,
				require: true
			},
			from :{
				type: Date,
				require: true
			},
			to: {
				type: Date,
				require: true
			},
			current: {
				type: Boolean,
				default: false
			}
		}

	],
	location: {
		type: String,
		require: true
	},
	skills :{
		type: [String],
		require: true
	},
	bio: {
		type: String,
		require: true
	},
	applied: {
		type: [String],
		require: true,
		default: []
	},
	asked: {
		type: [Schema.Types.ObjectId],
		default: []
	},
	experience: [
		{
			title:{
				type: String,
				require: true
			},
			company:{
				type: String,
				require: true
			},
			from :{
				type: Date,
				require: true
			},
			to: {
				type: Date,
				require: true
			},
			current: {
				type: Boolean,
				default: false
			},
			description:{
				type: String, 
				require: true
			}
		}
	]

});

module.exports = StudentProfile = mongoose.model('StudentProfile', StudentProfileSchema);