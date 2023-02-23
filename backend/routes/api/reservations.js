const express = require('express');
const router = express.Router();

const {requireUser} = require('../../config/passport');

const mongoose = require('mongoose');
const validateReservation = require('../../validations/reservation');

const Reservation = mongoose.model('Reservation');
const Spot = mongoose.model('Spot');
router.post('/:spotId', requireUser, validateReservation, async (req, res) => {
    const newReservation = new Reservation({


        user: req.user._id,
        spot: req.params.spotId,
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
        .populate("spot")
        console.log(reservation);
        return res.json(reservation);
    } catch(err) {
        const error = new Error('Reservation does not exist');
        error.statusCode = 404;
        error.errors = {message: "Reservation not found"};
        return next(error);
    }
});

router.patch('/:id', requireUser, async (req, res, next) => {
    try {
        // console.log(req.user)
        let reservation = await Reservation.findById(req.params.id).populate('spot', 'owner')
        console.log(reservation.user);
        console.log(req.user);
        console.log(reservation.spot.owner);

        if (reservation.user.toString() === req.user._id.toString() 
        || reservation.spot.owner.toString() === req.user._id.toString()){
            reservation = await Reservation.updateOne({_id: reservation._id}, req.body)
            return res.json(reservation);
        } else {
            const error = new Error('User is uninvolved in this reservation');
            error.statusCode = 404;
            error.errors = {message: 'User uninvolved with res'};
            throw error;
        }

        return res.json(reservation);
    } catch (err){
        return next(err);
    }
})

router.delete('/:id', requireUser, async (req, res, next) => {
    try {
        let reservation = await Reservation.findById(req.params.id);
        if (reservation.user.toString() === req.user._id.toString() 
        || reservation.spot.owner.toString() === req.user._id.toString()){
            reservation = await Reservation.deleteOne(reservation._id)
            return res.json(reservation);
        } else {
            const error = new Error('User is uninvolved in this reservation');
            error.statusCode = 404;
            error.errors = {message: 'User uninvolved with res'};
            throw error;
        }

        return res.json(reservation);
    } catch (err){
        return next(err);
    }
})

module.exports = router;