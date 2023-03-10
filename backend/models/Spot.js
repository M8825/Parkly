const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spotSchema = new Schema({
        address: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true 
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        size: {
            type: String,
            required: false
        },
        accessible: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        rating: {
            type: Number,
            min: [0, 'Must be at least 0'],
            max: [5, 'Must be at most 5']
        },
        rate: {
            type: Number,
            required: true
        },
        coordinates: {
            lat : Number,
            lng : Number
        },
        imageUrls: {
            type: [String],
            required: false
        },
        date: {
            type: [Date],
            required: false
        },
        startTime: {
            type: String,
            required: false
        },
        endTime: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Spot", spotSchema);
