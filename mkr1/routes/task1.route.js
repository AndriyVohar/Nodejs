const express = require('express');
const router = express.Router();

const controller = require('../controllers/task1.controller');
const middlewares = require('../middlewares/tasks.middleware');

router.route('/')
    .post(middlewares.task1DataValidation,controller.createTask1);

module.exports = router;