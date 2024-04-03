const createError = require('http-errors');
const task1Model = require('../models/task1.model');

async function createTask1(req, res, next) {
    try {
        const {base1, base2, height} = req.body;
        let area = 1/2*(base1+base2)*height;
        let side = Math.sqrt(Math.pow(Math.abs(base1-base2)/2,2)+Math.pow(height,2));
        let perimeter = base1+base2+2*side;
        let request = {
            base1: base1,
            base2: base2,
            height: height,
            area: area,
            perimeter:perimeter
        };
        const task = await task1Model.create(request);

        res.status(200).json({
            status: 200,
            data: task,
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};
module.exports = {
    createTask1
};