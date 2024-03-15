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
async function bookYearPublishingValidation(req,res,next) {
    try{
        const {year_publishing} = req.body;
        if(year_publishing<1801){
            throw createError.NotFound("year_publishing not valid");
        }
        next();
    }catch(err){
        next(err);
    }
}

module.exports = {
    bookByIdValidation,
    bookYearPublishingValidation
};