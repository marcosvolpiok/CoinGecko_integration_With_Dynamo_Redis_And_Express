const router = require('express').Router();
const {
    customerControllerOb,
} = require('../dependencies/');

router.put('/customer/', customerControllerOb.add);
router.post('/customer/login/', customerControllerOb.login);

module.exports = router;