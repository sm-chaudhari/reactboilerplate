const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    first_name: {
		type: String,
		required: true
    },
    last_name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
    },
    profilePictureUrl: {
		type: String,
		required: false
	},
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

userSchema.pre('save', async function(next) {
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;
	next();
});

userSchema.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);
	return compare;
}

const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;