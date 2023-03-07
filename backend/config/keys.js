// backend/config/keys.js
require('dotenv').config();

module.exports = {
	secretOrKey: process.env.SECRET_OR_KEY,
	mongoURI: process.env.MONGO_URI,
	isProduction: process.env.NODE_ENV === "production",
};
