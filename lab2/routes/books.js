var express = require('express');
var router = express.Router();

const controller = require('../controller/books.controller')
const middleware = require('../middlewares/book.middleware')

router.route('/')
  .get(controller.getBooks)
  .post(controller.createBook)

router.route('/:id')
  .get(middleware.bookByIdValidation, controller.getBook)
  .put(middleware.bookByIdValidation, controller.updateBook)
  .delete(middleware.bookByIdValidation, controller.deleteBook)

module.exports = router;
