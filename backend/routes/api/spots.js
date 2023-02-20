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

    res.json({
        message: "you got it working jo"
    })
});

module.exports = router;