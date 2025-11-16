const Joi = require('joi'); 
const mongoose = require('mongoose');

const Customer = new mongoose.model('Customer', new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength:5,
        maxlength:50
    },
    isGold:{
         type:Boolean,
         default: false
    },
    phone:{
        type:String,
        required: true,
        minlength:5,
        maxlength:50
    },
}));

function inputValidation(body){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    });
    const validationResult = schema.validate(body);
    return validationResult;
};

module.exports.Customer = Customer;
module.exports.validate = inputValidation;