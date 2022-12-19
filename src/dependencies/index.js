const bcrypt = require('bcrypt');
const { createClient } = require("redis");
const loginHelper = require('../helpers/loginHelper');
const { cacheHelper } = require('../helpers/cacheHelper');
const cacheHelperOb = new cacheHelper(createClient);

const customerRepository = require('../repository/customerRepository');

const customerService = require('../services/customerService');

const {Customer, Sequelize, sequelize} = require('../models');

const customerRepositoryOb=new customerRepository(Customer, Sequelize, sequelize, cacheHelperOb);
const customerServiceOb = new customerService(customerRepositoryOb, bcrypt, loginHelper);

module.exports = {
    Sequelize, sequelize,
    customerServiceOb
};