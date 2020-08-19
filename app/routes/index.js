const express = require('express');
const router = express.Router();

const customersRoutes = require('./customers');
const usersRoutes = require('./users');

router.use('/api/customers', customersRoutes);
router.use('/api/users', usersRoutes);

module.exports = router;