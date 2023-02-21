const express = require('express');
const router = express.Router();

const { requireUser } = require('../../config/passport')

const mongoose = require('mongoose');
const validateSpot = require('../../validations/spot');

const Spot = mongoose.model('Spot');

router.post('/', requireUser, validateSpot, async (req, res, next) => {

    try{
        const newSpot = new Spot({
            address: req.body.address,
            zip: req.body.zip,
            city: req.body.city,
            state: req.body.state,
            owner: req.user._id,
            size: req.body.size,
            accessible: req.body.accessible
        });

        let spot = await newSpot.save();
        spot = await spot.populate('owner', '_id username');
        return res.json(spot);
    }
    catch{
        next(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const spots = await Spot.find().populate("owner", "_id username").sort({createdAt: -1});
        return res.json(spots);
    }
    catch(err) {
        return res.json([]);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const spot = await Spot.findById(req.params.id)
        .populate("author", "_id username");
        return res.json(spot);
    }
    catch(err) {
        const error = new Error('Spot does not exist');
        error.statusCode = 404;
        error.errors = {message: "Spot not found"};
        return next(error);
    }
})
module.exports = router;
