const createError = require('http-errors');
const task2Model = require('../models/task2.model');

async function getTask2(req, res, next) {
    try {
        a0 = 4;
        let a = a0;
        for(let i =1; i<=12;i++){
            let angle = Math.pow(a,i) / 12;
            a = a-Math.cos(angle);
        }

        res.status(200).json({
            status: 200,
            data: a,
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};
module.exports = {
    getTask2
};