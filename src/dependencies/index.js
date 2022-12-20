const bcrypt = require('bcrypt');
const loginHelper = require('../helpers/loginHelper');
var AWS = require('aws-sdk');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];


const customerRepository = require('../repository/customerRepository');

const customerService = require('../services/customerService');

const customerController = require('../controllers/customerController');


const customerRepositoryOb=new customerRepository(AWS, config);
const customerServiceOb = new customerService(customerRepositoryOb, bcrypt, loginHelper);
const customerControllerOb = new customerController(customerServiceOb);

module.exports = {
    customerServiceOb,
    customerControllerOb
};