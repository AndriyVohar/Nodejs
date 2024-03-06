const Joi = require('joi');

const BookSchema = Joi.object({
    title: Joi.string()
        .min(1)
        .max(50),

    author: Joi.string()
        .min(1)
        .max(50),

    year_publishing: Joi.number(),

    address_publishing: Joi.string()
        .min(1)
        .max(100),

    price: Joi.number(),

    company_publishing: Joi.string()
        .min(1)
        .max(50),
});

module.exports = {
    BookSchema,
}; 