var express = require('express');
var router = express.Router();

const controller = require('../controllers/halereya.controller')
const middleware = require('../middlewares/halereya.middleware')

router.route('/')
    .get(controller.getHalereyas)
    .post(controller.createHalereya)

router.route('/file')
    .post(middleware.halereyaUploadJSON, controller.createHalereyaFromJSONFile)

router.route('/:id')
    .get(controller.getHalereya)
    .put(controller.updateHalereya)
    .delete(controller.deleteHalereya)

module.exports = router;
