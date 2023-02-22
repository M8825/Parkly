const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spotSchema = new Schema({
        address: {
            type: String,
            required: true
        }
        ,
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
            required: true
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
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Spot", spotSchema);