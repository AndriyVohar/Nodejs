const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;

async function task1DataValidation(req,res,next){
    try{
        const {base1, base2, height} = req.body;
        if(base1&&base2&&height){
            if(base1<0||base2<0||height<0){
                throw createError.BadRequest("Значення не можуть бути менше нуля");
            }
        }else{
            throw createError.BadRequest("Ви ввели не всі значення: base1, base2, height; або ввели 0 ");
        }
        next();
    }
    catch(err){
        next(err);
    }
};

module.exports = {
    task1DataValidation,
};