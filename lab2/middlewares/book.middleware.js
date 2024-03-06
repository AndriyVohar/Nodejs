const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;
const bookService = require('../services/books.service');

async function bookByIdValidation(req, res, next) {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            throw createError.BadRequest("book id is not valid");
        }

        const book = await bookService.findById(id);

        if (!book) {
            throw createError.NotFound("book with such id not found");
        }

        next();
    } catch(err) {
        next(err);
    }
};

module.exports = {
    bookByIdValidation,
};