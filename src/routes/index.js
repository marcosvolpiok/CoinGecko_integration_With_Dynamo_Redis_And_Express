const router = require('express').Router();
const {
    customerControllerOb,
    cotizationControllerOb
} = require('../dependencies/');

router.put('/customer/', customerControllerOb.add);
router.post('/customer/login/', customerControllerOb.login);
router.get('/cotizations/all/', cotizationControllerOb.list);

module.exports = router;