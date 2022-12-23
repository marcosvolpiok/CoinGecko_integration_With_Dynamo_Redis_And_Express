const router = require('express').Router();
const {
    customerControllerOb,
    cotizationControllerOb
} = require('../dependencies/');

router.put('/customer/', customerControllerOb.add);
router.post('/customer/login/', customerControllerOb.login);
router.get('/cotizations/all/', cotizationControllerOb.list);
router.post('/cotizations/add/', cotizationControllerOb.add);
router.get('/cotizations/user/:order/:limit', cotizationControllerOb.listByUser);

module.exports = router;