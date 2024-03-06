const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    year_publishing: {
      type: Number,
      required: true,
    },
    address_publishing: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    company_publishing: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("books", bookSchema, "books");
