const express = require('express');
const router = express.Router();

const { multipleFilesUpload, multipleMulterUpload, deleteFile, deleteFiles } = require("../../awsS3");

const { requireUser } = require('../../config/passport')

const mongoose = require('mongoose');
const validateSpot = require('../../validations/spot');

const Spot = mongoose.model('Spot');
const Reservation = mongoose.model('Reservation');

// router.post('/', multipleMulterUpload("images"), requireUser, validateSpot, async (req, res, next) => {
router.post('/', multipleMulterUpload("images"), requireUser, validateSpot, async (req, res, next) => {


    let imageUrls = [];

    console.log("FOO BAR")
    if (req.body.images){
        imageUrls = await multipleFilesUpload({ files: req.body.images, public: true });
    }

    try {
        const newSpot = new Spot({
            address:    req.body.address,
            zip:        req.body.zip,
            city:       req.body.city,
            state:      req.body.state,
            owner:      req.user._id,
            size:       req.body.size,
            accessible: req.body.accessible,
            title:      req.body.title,
            description:    req.body.description,
            rating:         req.body.rating,
            coordinates:    req.body.coordinates,
            startDate:      req.body.startDate,
            endDate:        req.body.endDate,
            rate:           req.body.rate,
            imageUrls
        });
        let spot = await newSpot.save();
        spot = await spot.populate('owner', '_id firstName lastName');
        return res.json(spot);
    } catch(err) {
        const error = new Error()
    }
});

router.get('/:id', async (req, res, next) => {

    try {
        const spot = await Spot.findById(req.params.id)
        .populate("owner", "_id firstName lastName");
        return res.json(spot);
    }
    catch(err) {
        const error = new Error('Spot does not exist');
        error.statusCode = 404;
        error.errors = {message: "Spot not found"};
        return next(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const spots = await Spot.find().populate("owner", "_id firstName lastName").sort({createdAt: -1});
        return res.json(spots);
    }
    catch(err) {
        return res.json([]);
    }
})

router.patch('/:id', requireUser, async (req, res, next) => {
    try {
        let spot = await Spot.findById(req.params.id);
        if (spot.owner.toString() === req.user._id.toString()){
            if (req.files) {let imageUrls = await multipleFilesUpload({ files: req.files, public: true })}
            if (req.body.keys) await deleteFiles(keys)
            spot = await Spot.updateOne({_id: spot._id}, req.body)
            return res.json(spot);
        } else {
            const error = new Error('User does not own that spot');
            error.statusCode = 404;
            error.errors = {message: "User doesn't own spot"};
            throw error;
        }

        return res.json(spot);
    } catch(err){
        return next(err);
    }
});

router.delete('/:id', requireUser, async (req, res, next) => {
    try {

        let spot = await Spot.findById(req.params.id);
        if (spot.owner.toString() === req.user._id.toString()) {
            const imageUrls = spot.imageUrls;
            const keys = imageUrls.map(url => {return {Key: url.split('/').pop()}});
            console.log(keys);
            await deleteFiles(keys)
            spot = await Spot.deleteOne({_id: spot._id});
            return res.json(spot);
        } else {
            const error = new Error('User does not own that spot');
            error.statusCode = 404;
            error.errors = {message: "User doesn't own spot"};
            throw error;
        }
    } catch(err) {
        return next(err);
    }
});

router.get('/reservations/:spotId/', async function (req, res) {
    const reservations = await Reservation.find({spot: req.params.spotId});
    return res.json(reservations);
})

module.exports = router;
