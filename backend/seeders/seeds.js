const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");
const Spot = require("../models/Spot");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

const NUM_SEED_USERS = 10;
const NUM_SEED_SPOTS = 30;

// Create users
const users = [];
const spots = [];
users.push(
	new User({
		firstName: "demo",
		lastName: "user",
		email: "demo@user.io",
		phoneNumber: "9999999999",
		hashedPassword: bcrypt.hashSync("password", 10),
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
	spots.push(new Spot({
		address: faker.address.streetAddress(),
		zip: faker.address.zipCode().slice(0, 5),
		city: faker.address.city(),
		state: faker.address.stateAbbr(),
		owner: users[Math.floor(Math.random() * users.length)]._id,
		size: faker.random.word(),
		accessible: Math.random() < 0.5,
		title: faker.lorem.sentence(),
		description: faker.lorem.paragraph(),
		rating: Math.floor(Math.random() * 6)
	  }));
};

// Connect to database
mongoose.set('strictQuery', true)
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = async () => {
    try {
        console.log("> Resetting and seeding users...");
        await User.collection.drop();
        await User.insertMany(users);
        console.log("> Users seeded");


        console.log("> Resetting and seeding spots...");
        await Spot.collection.drop();
        await Spot.insertMany(spots);
        console.log("> Spots seeded");

        mongoose.disconnect();
    } catch (err) {
        console.error(err.stack);
        process.exit(1);
    }

};
