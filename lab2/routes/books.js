var express = require('express');
var router = express.Router();

const controller = require('../controller/books.controller')

router.route('/')
  .get(controller.getBooks)
  .post(controller.createBook)

router.route('/:id')
  .get(controller.getBook)
  .put(controller.updateBook)
  .delete(controller.deleteBook)

module.exports = router;
