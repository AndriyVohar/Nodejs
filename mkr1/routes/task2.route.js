const express = require('express');
const router = express.Router();

const controller = require('../controllers/task2.controller');
// const middleware = require('../middlewares/task2.middleware');

router.route('/')
    .get(controller.getTask2);

module.exports = router;