const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

const NUM_SEED_USERS = 10;
const NUM_SEED_SPOTS = 20;

// Create users
const users = [];

users.push(
	new User({
		firstName: "demo",
		lastName: "user",
		email: "demo-user@appacademy.io",
		phoneNumber: "9999999999",
		hashedPassword: bcrypt.hashSync("starwars", 10),
	})
);

for (let i = 1; i < NUM_SEED_USERS; i++) {
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();
	const phoneNumber = Math.floor(Math.random() * (Math.pow(10, 10) - Math.pow(10, 9)) + Math.pow(10, 9))
	users.push(
		new User({
			firstName: firstName,
			lastName: lastName,
			email: faker.internet.email(firstName, lastName),
			phoneNumber: phoneNumber,
			hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
		})
	);
}
for(let i = 1; i < NUM_SEED_SPOTS; i++){
	
}

// Connect to database
mongoose.set('strictQuery', true)
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('> Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });


const insertSeeds = () => {
	console.log("> Resetting db and seeding users...");

	User.collection
		.drop()
		.then(() => User.insertMany(users))
		.then(() => {
			console.log("> Done!");
			mongoose.disconnect();
		})
		.catch((err) => {
			console.error(err.stack);
			process.exit(1);
		});
};
