const express = require("express");
const router = express.Router();

const {
	multipleFilesUpload,
	multipleMulterUpload,
	deleteFile,
	deleteFiles,
} = require("../../awsS3");

const { requireUser } = require("../../config/passport");

const mongoose = require("mongoose");
const validateSpot = require("../../validations/spot");
const { response } = require("express");

const Spot = mongoose.model("Spot");
const Reservation = mongoose.model("Reservation");

router.post(
	"/",
	multipleMulterUpload("images"),
	requireUser,
	validateSpot,
	async (req, res, next) => {
		let imageUrls = [];

		if (req.files) {
			imageUrls = await multipleFilesUpload({
				files: req.files,
				public: true,
			});
		}

		const coordinates = JSON.parse(req.body.coordinates);

		const dateRange = [];

		if (req.body.date) {
			req.body.date.split(",").forEach((date) => {
				dateRange.push(new Date(date));
			});
		}

		try {
			const newSpot = new Spot({
				address: req.body.address,
				zip: req.body.zip,
				city: req.body.city,
				state: req.body.state,
				owner: req.user._id,
				size: req.body.size,
				accessible: req.body.accessible,
				title: req.body.title,
				description: req.body.description,
				rating: req.body.rating,
				coordinates: coordinates,
				date: dateRange,
				startTime: req.body.startTime,
				endTime: req.body.endTime,
				rate: req.body.rate,
				imageUrls,
			});

			let spot = await newSpot.save();
			spot = await spot.populate("owner", "_id firstName lastName");
			return res.json(spot);
		} catch (err) {
			next(err);
		}
	}
);

router.get("/:id", async (req, res, next) => {
	try {
		const spot = await Spot.findById(req.params.id).populate(
			"owner",
			"_id firstName lastName"
		);
		return res.json(spot);
	} catch (err) {
		const error = new Error("Spot does not exist");
		error.statusCode = 404;
		error.errors = { message: "Spot not found" };
		return next(error);
	}
});

router.get("/", async (req, res) => {
	try {
		const spots = await Spot.find()
			.populate("owner", "_id firstName lastName")
			.sort({ createdAt: -1 });
		return res.json(spots);
	} catch (err) {
		return res.json([]);
	}
});

router.patch(
	"/:id",
	multipleMulterUpload("images"),
	requireUser,
	validateSpot,
	async (req, res, next) => {
		try {
			let spot = await Spot.findById(req.params.id);

			let imageUrls;

			if (spot.owner._id.toString() === req.user._id.toString()) {
				if (req.files) {
					imageUrls = await multipleFilesUpload({
						files: req.files,
						public: true,
					});
				}

				const coordinates = JSON.parse(req.body.coordinates);

				const dateRange = [];
				if (req.body.date) {
					req.body.date.split(",").forEach((date) => {
						dateRange.push(new Date(date));
					});
				}

				let updateSpot = {
					_id: spot._id,
					address: req.body.address,
					zip: req.body.zip,
					city: req.body.city,
					state: req.body.state,
					owner: req.user._id,
					size: req.body.size,
					accessible: req.body.accessible,
					title: req.body.title,
					description: req.body.description,
					rating: req.body.rating,
					coordinates: coordinates,
					date: dateRange,
					startTime: req.body.startTime,
					endTime: req.body.endTime,
					rate: req.body.rate,
					imageUrls,
				};

				await Spot.findOneAndUpdate({_id: spot._id}, updateSpot);

				const findUpdateSpot = await Spot.findById({_id: spot._id});

				const response = await res.json(findUpdateSpot);

				return response
			} else {
				const error = new Error("User does not own that spot");
				error.statusCode = 404;
				error.errors = { message: "User doesn't own spot" };
				throw error;
			}

			return res.json(spot);
		} catch (err) {
			return next(err);
		}
	}
);

router.delete("/:id", requireUser, async (req, res, next) => {
	try {
		let spot = await Spot.findById(req.params.id);
		if (spot.owner.toString() === req.user._id.toString()) {
			const imageUrls = spot.imageUrls;
			const keys = imageUrls.map((url) => {
				return { Key: url.split("/").pop() };
			});
			console.log(keys);
			if (keys) await deleteFiles(keys);
			await Reservation.deleteMany({ spot: spot._id });
			spot = await Spot.deleteOne({ _id: spot._id });
			return res.json(spot);
		} else {
			const error = new Error("User does not own that spot");
			error.statusCode = 404;
			error.errors = { message: "User doesn't own spot" };
			throw error;
		}
	} catch (err) {
		return next(err);
	}
});

router.get("/reservations/:spotId/", async function (req, res) {
	const reservations = await Reservation.find({ spot: req.params.spotId });
	return res.json(reservations);
});

module.exports = router;
