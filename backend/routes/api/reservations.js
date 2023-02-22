const express = require('express');
const router = express.Router();

const {requireUser} = require('../../config/passport');

const mongoose = require('mongoose');
const validateReservation = require('../../validations/reservation');

const Reservation = mongoose.model('Reservation');

router.post('/', requireUser, validateReservation, async (req, res, next) => {
    const newReservation = new Reservation({
        user: req.user._id,
        spot: req.body.spot,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    })

    let reservation = await newReservation.save();
    // reservation = await reservation.populate('user', '_id').populate('spot', '_id');
    return res.json(reservation);
});

module.exports = router;