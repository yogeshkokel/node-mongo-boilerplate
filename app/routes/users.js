const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');

router.route('/')
    .post(userController.addUser)

router.route('/login')
    .post(userController.login)

module.exports = router;
