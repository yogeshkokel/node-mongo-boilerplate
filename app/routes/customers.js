const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customer.controller');

const upload = require('../middleware/upload');
const checkAuth = require('../middleware/auth');

router.route('/')
    .get(checkAuth, customerController.getAllCustomers)
    .post(checkAuth, upload, customerController.addCustomer)

router.route('/:id')
    .get(checkAuth, customerController.getSingleCustomerDetails)
    .put(checkAuth, customerController.updateCustomerDetails)
    .delete(checkAuth, customerController.removeCustomer)

module.exports = router;
