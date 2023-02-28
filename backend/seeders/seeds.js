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


const titles = [  "Downtown Parking Available",  "Reserved Parking Spot for Rent",  "24/7 Parking Spot near Stadium",  "Covered Parking Spot for Rent",  "Parking Available in Gated Community",  "Monthly Parking Pass Available",  "Safe and Secure Parking Spot",  "Private Parking Spot for Rent",  "Convenient Parking Spot near Transit",  "Parking Spot for Commuters",  "RV Parking Spot for Rent",  "Outdoor Parking Spot Available",  "Parking Spot with EV Charging",  "Short-term Parking Available",  "Long-term Parking Available",  "Parking for Motorcycles Available",  "Parking Spot in Busy Neighborhood",  "Parking for Events Available",  "Off-Street Parking Available",  "Tandem Parking Spot for Rent"]
const descriptions = [  "Covered parking in downtown garage, near public transit. Use parking permit provided.",  "Reserved parking in gated lot near train station. Use key fob provided for access.",  "Spacious driveway parking in quiet residential area. Do not block driveway.",  "Indoor parking with EV charging in secure garage near office park. Fully charge before leaving spot.",  "Outdoor parking in well-lit lot near airport. Do not block other vehicles.",  "Covered parking in residential neighborhood, monthly rental available. Use designated spot.",  "Tandem parking in gated lot near public transit, 24/7 monitoring. Park both vehicles in designated spot.",  "Off-street parking in busy neighborhood, weekly or monthly rental available. Use designated spot.",  "RV parking with water and electric hookups on private property. No dumping allowed.",  "Motorcycle parking in secure garage near college campus. Use designated spot and park within lines.",  "Compact car parking in lot near shopping center. Use designated spot and do not block other vehicles.",  "Boat parking in lot near marina. Use designated spot and do not block other vehicles.",  "Truck parking in lot near highway. Use designated spot and do not block other vehicles.",  "Long-term parking in lot near national park. Use designated spot and display permit on dashboard.",  "Large vehicle parking in lot near convention center. Use designated spot and do not block other vehicles.",  "Handicap parking in lot near medical center. Display valid handicap permit on dashboard.",  "Car share parking in lot near city center. Use designated spot and park within lines.",  "Bicycle parking in lot near bike trail. Use designated spot and secure bike properly.",  "Snowmobile parking in lot near trailhead. Use designated spot and do not block other vehicles.",  "Fishing gear storage in lot near river. Use designated spot and lock storage unit properly."]
const streets = [  "E 50",  "E 51",  "E 52",  "E 53",  "E 54",  "E 55",  "E 56",  "E 57",  "E 58",  "E 59",  "E 60",  "E 61",  "E 62",  "E 63",  "E 64",  "E 65",  "E 66",  "E 67",  "E 68",  "E 69",  "E 70",  "E 71",  "E 72",  "E 73",  "E 74",  "E 75",  "E 76",  "E 77",  "E 78",  "E 79",  "E 80",  "E 81",  "E 82",  "E 83",  "E 84",  "E 85",  "E 86",  "E 87",  "E 88",  "E 89",  "E 90",  "E 91",  "E 92",  "E 93",  "E 94",  "E 95",  "E 96",  "E 97",  "E 98",  "E 99",  "E 100"]
const carTypes = ["Sedan", "SUV", "Compact", "Motorcycle", "Truck", "Minivan"]

for(let i = 1; i < NUM_SEED_SPOTS; i++){
	let streetArrayIndex = Math.floor(Math.random() * streets.length);
	spots.push(new Spot({
		address: `${Math.floor(Math.random() * 400)} East ${streets[streetArrayIndex]} Street`,
		zip: streetArrayIndex < 20 ? "10021" : "100028",
		city: "New York City",
		state: "NY",
		owner: users[Math.floor(Math.random() * users.length)]._id,
		size: carTypes[Math.floor(Math.random() * carTypes.length)],
		accessible: Math.random() < 0.5,
		title: titles[Math.floor(Math.random() * 21)],
		description: descriptions[Math.floor(Math.random() * 21)],
		rate: Math.floor(Math.random() * 100),
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
        await User.collection.drop();
        await User.insertMany(users);


        await Spot.collection.drop();
        await Spot.insertMany(spots);

        mongoose.disconnect();
    } catch (err) {
        console.error(err.stack);
        process.exit(1);
    }

};
