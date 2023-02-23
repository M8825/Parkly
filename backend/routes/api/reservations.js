const express = require('express');
const router = express.Router();

const {requireUser} = require('../../config/passport');

const mongoose = require('mongoose');
const validateReservation = require('../../validations/reservation');

const Reservation = mongoose.model('Reservation');

router.post('/', requireUser, validateReservation, async (req, res) => {
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

router.get('/:id', async (req, res, next) => {
    try {
        let reservation = await Reservation.findById(req.params.id)
        .populate("user", "_id firstName lastName")
        .populate("spot", "_id address city state zip")

        return res.json(reservation);
    } catch(err) {
        const error = new Error('Reservation does not exist');
        error.statusCode = 404;
        error.errors = {message: "Reservation not found"};
        return next(error);
    }
});

module.exports = router;