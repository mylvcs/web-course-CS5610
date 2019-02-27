const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/web-referral-app');
const Schema = mongoose.Schema;

// Create Schema
//Done by Zhou
const WorkerProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	name:{
		type: String,
		require: true
	},
	email:{
		type: String,
		require: true
	},
	company: {
		type: String,
		require: true
	},
	location: {
		type: String,
		require: true
	},
	referred: {
		type:[String],
	}
});

module.exports = WorkerProfile = mongoose.model('WorkerProfile', WorkerProfileSchema);