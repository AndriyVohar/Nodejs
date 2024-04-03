const { Schema, model } = require('mongoose');

const task1Schema = new Schema({
    base1: {
        type: Number,
        required: true,
    },
    base2: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    area: {
        type: Number,
        required: true,
    },
    perimeter: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = model('task1', task1Schema);