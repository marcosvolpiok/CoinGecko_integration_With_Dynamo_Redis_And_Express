const router = require('express').Router();
const {
    customerControllerOb,
} = require('../dependencies/');

router.get('/customer/', customerControllerOb.list);
router.put('/customer/', customerControllerOb.add);
router.post('/customer/login/', customerControllerOb.login);

module.exports = router;