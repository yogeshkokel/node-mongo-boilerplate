const express = require('express');
const router = express.Router();

const customersRoutes = require('./customers');
const usersRoutes = require('./users');
const complaintRoutes = require('./complaints');

router.use('/api/customers', customersRoutes);
router.use('/api/users', usersRoutes);
router.use('/api/complaints', complaintRoutes);

module.exports = router;