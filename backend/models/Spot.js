const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spotSchema = new Schema({
    address: {
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
    }
})