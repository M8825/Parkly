const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        spot: {
            type: Schema.Types.ObjectId,
            ref: 'Spot'
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true 
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Reservation', reservationSchema);