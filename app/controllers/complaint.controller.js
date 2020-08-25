const httpStatus = require('http-status');
const logger = require('../services/logger');

const Complaint = require('../models/complaint');

module.exports.addComplaint = function (req, res) {
    const complaintObject = new Complaint({
        complaintTitle: req.body.complaintTitle,
        complaintDescription: req.body.complaintDescription,
        complaintDate: new Date(),
        customerId: req.body.customerId
    })
    complaintObject.save(function (error, result) {
        if (error) {
            logger.error(error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: error.message, error: error })
        } else {
            res.status(httpStatus.CREATED).json({ status: true, message: "Complaint Added Successfully", error: null, result })
        }
    })
}

module.exports.getAllComplaints = function (req, res) {
    Complaint.find().populate('customerId').exec(function (error, result) {
        if (error) {
            logger.error(error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: error.message, error: error })
        } else {
            res.status(httpStatus.OK).json({ status: true, message: "Complaints List Fetched Successfully", error: null, Records: result })
        }
    })
}

module.exports.getSingleComplaintDetails = function (req, res) {
    let id = req.params.id;
    Complaint.findById({ _id: id }).populate('customerId').exec(function (error, result) {
        if (error) {
            logger.error(error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: error.message, error: error })
        } else if (result) {
            res.status(httpStatus.OK).json({ status: true, message: "Complaint Details Fetched Successfully", error: null, result })
        } else {
            logger.info(result);
            res.status(httpStatus.NOT_FOUND).json({ status: false, message: "No Such Complaint Details Found", error: null, result })
        }
    })
}

module.exports.getAllCustomerComplaints = function (req, res) {
    let id = req.params.id;
    Complaint.find({ customerId: id }).exec(function (error, result) {
        if (error) {
            logger.error(error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: error.message, error: error })
        } else if (result) {
            res.status(httpStatus.OK).json({ status: true, message: "Customer Complaints Fetched Successfully", error: null, result })
        } else {
            logger.info(result);
            res.status(httpStatus.NOT_FOUND).json({ status: false, message: "No Complaint Details Found for this customer id", error: null, result })
        }
    })
}

module.exports.updateAComplaint = function (req, res) {
    let id = req.params.id;
    const updateObject = {};

    Object.keys(req.body).map(x => {
        updateObject[x] = req.body[x];
    })

    Complaint.update({ _id: id }, { $set: updateObject }, function (error, result) {
        if (error) {
            logger.error(error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: error.message, error: error })
        } else {
            res.status(httpStatus.OK).json({ status: true, message: "Complaint Updated Successfully", error: null, result })
        }
    })
}

module.exports.deleteAComplaint = function(req,res){
    let id = req.params.id
    Complaint.remove({ _id: id }, function (error, result) {
        if (error) {
            logger.error(error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: error.message, error: error })
        } else {
            res.status(httpStatus.OK).json({ status: true, message: "Complaint Removed", error: null, result })
        }
    })
}