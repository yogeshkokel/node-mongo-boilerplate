const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config');

const User = require('../models/users');

module.exports.addUser = function (req, res) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: err.message, error: err })
        } else {
            const UserObject = new User({
                email: req.body.email,
                password: hash,
                username: req.body.username
            })
            UserObject.save((error, result) => {
                if (error) {
                    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: error.message, error: error })
                } else {
                    res.status(httpStatus.CREATED).json({ status: true, message: "User Added Successfully", error: null, result })
                }
            })
        }
    });
}

module.exports.login = function (req, res) {
    User.find({ email: req.body.email }, function (err, users) {
        if (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: error.message, error: err })
        } else if (users.length == 0) {
            res.status(httpStatus.NOT_FOUND).json({ status: true, message: "User not found", error: null })
        } else {
            bcrypt.compare(req.body.password, users[0].password, function (err, result) {
                if (err) {
                    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: error.message, error: err })
                } else if (!result) {
                    res.status(httpStatus.UNAUTHORIZED).json({ status: true, message: "User Authentication Failed", error: null })
                } else {
                    const token = jwt.sign({
                        username: users[0].username,
                        email: users[0].email,
                        userId: users[0]._id
                    }, config.JWT_SECRET_KEY, { expiresIn: '7d' })
                    res.status(httpStatus.OK).json({ status: true, message: "Auth Successfully", error: null, token })
                }
            });
        }
    })
}

