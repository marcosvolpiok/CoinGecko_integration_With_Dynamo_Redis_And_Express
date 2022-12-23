const bcrypt = require('bcrypt');
const loginHelper = require('../helpers/loginHelper');
const AWS = require('aws-sdk');
const { createClient } = require("redis");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
require('dotenv').config();
const { cacheHelper } = require('../helpers/cacheHelper');
const cacheHelperOb = new cacheHelper(createClient);


const customerRepository = require('../repository/customerRepository');
const cotizationRepository = require('../repository/cotizationRepository');

const customerService = require('../services/customerService');
const cotizationService = require('../services/cotizationService');

const customerController = require('../controllers/customerController');
const cotizationController = require('../controllers/cotizationController');

const customerRepositoryOb=new customerRepository(AWS, config);
const customerServiceOb = new customerService(customerRepositoryOb, bcrypt, loginHelper);
const customerControllerOb = new customerController(customerServiceOb);

const cotizationRepositoryOb=new cotizationRepository(AWS, config, cacheHelperOb);
const cotizationServiceOb = new cotizationService(cotizationRepositoryOb);
const cotizationControllerOb = new cotizationController(cotizationServiceOb);

module.exports = {
    customerServiceOb,
    customerControllerOb,
    cotizationControllerOb,
    cacheHelperOb
};