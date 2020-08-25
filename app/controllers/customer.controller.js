const httpStatus = require('http-status');
const logger = require('../services/logger');

const Customer = require('../models/customer');

module.exports.getAllCustomers = function (req, res) {
    Customer.find({}, (error, result) => {
        if (error) {
            logger.error(error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: error.message, error: error })
        } else {
            res.status(httpStatus.OK).json({ status: true, message: "Customer List Fetched Successfully", error: null, Records: result })
        }
    })
}

module.exports.addCustomer = function (req, res) {
    const customerObject = new Customer({
        name: req.body.name,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        customerImage: req.file.filename
    })
    customerObject.save((error, result) => {
        if (error) {
            logger.error(error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: error.message, error: error })
        } else {
            res.status(httpStatus.CREATED).json({ status: true, message: "Customer Added Successfully", error: null, result })
        }
    })
}

module.exports.getSingleCustomerDetails = function (req, res) {
    let id = req.params.id
    Customer.findById({ _id: id }, function (error, result) {
        if (error) {
            logger.error(error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: error.message, error: error })
        } else if (result) {
            res.status(httpStatus.OK).json({ status: true, message: "Customer Details Fetched Successfully", error: null, result })
        } else {
            logger.info(result);
            res.status(httpStatus.NOT_FOUND).json({ status: false, message: "No Such Customer Details Found", error: null, result })
        }
    })
}

module.exports.updateCustomerDetails = function (req, res) {
    let id = req.params.id;
    const updateObject = {};

    Object.keys(req.body).map(x => {
        updateObject[x] = req.body[x];
    })

    Customer.update({ _id: id }, { $set: updateObject }, function (error, result) {
        if (error) {
            logger.error(error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: error.message, error: error })
        } else {
            res.status(httpStatus.OK).json({ status: true, message: "Customer Data Updated Successfully", error: null, result })
        }
    })
}

module.exports.removeCustomer = function (req, res) {
    let id = req.params.id

    Customer.remove({ _id: id }, function (error, result) {
        if (error) {
            logger.error(error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: error.message, error: error })
        } else {
            res.status(httpStatus.OK).json({ status: true, message: "Customer Details Removed", error: null, result })
        }
    })
}