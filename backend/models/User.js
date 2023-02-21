const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: Number,
			required: true
		}
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User", userSchema);
