const router = require('express').Router();
const {
    customerControllerOb,
    cotizationControllerOb
} = require('../dependencies/');
const Joi = require('joi');

router.put('/customer/', addCustomer, customerControllerOb.add);
router.post('/customer/login/', customerControllerOb.login);
router.get('/cotizations/all/', cotizationControllerOb.list);
router.post('/cotizations/', cotizationControllerOb.add);
router.get('/cotizations/user/:order/:limit', listByUser, cotizationControllerOb.listByUser);

function addCustomer(req, res, next){
    const schema = Joi.object({
        password: Joi.string().min(8).max(20).required(),
        first_name: Joi.string().max(50).required(),
        last_name: Joi.string().max(50).required(),
        username: Joi.string().max(50).required(),
        favorite_fiat_coin: Joi.string().max(50).required(),
    });
    validateRequest(req, next, schema);
}

function listByUser(req, res, next){
    const schema = Joi.object({
        order: Joi.string().valid('ASC', 'DESC', 'asc', 'desc').required(),
        limit: Joi.number().min(26)
    });
    validateRequest(req, next, schema);
}


function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    let params;

    if(Object.keys(req.body).length>0){
        params=req.body;

    }else{
        params=req.params;
    }

    const { error, value } = schema.validate(params, options);

    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}

module.exports = router;