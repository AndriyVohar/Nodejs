const { Schema, model } = require("mongoose");

const halereyaSchema = new Schema(
    {
        artistSurname: {
            type: String,
            required: true,
        },
        paintingTitle: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        status: {
            type: Number,
            required: true,
            enum: [1, 2, 3], // 1 – картина в експозиції; 2 – картина в запаснику; 3 – картина на "виїзді"
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Halereya", halereyaSchema, "halereya");
