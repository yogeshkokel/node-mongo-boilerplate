const express = require('express');
const router = express.Router();

const complaintController = require('../controllers/complaint.controller');

const checkAuth = require('../middleware/auth');

router.route('/')
    .post(checkAuth, complaintController.addComplaint)
    .get(checkAuth, complaintController.getAllComplaints)

router.route("/:id")
    .get(checkAuth, complaintController.getSingleComplaintDetails)
    .put(checkAuth, complaintController.updateAComplaint)
    .delete(checkAuth, complaintController.deleteAComplaint)

router.route("/customer/:id")
    .get(checkAuth, complaintController.getAllCustomerComplaints)


module.exports = router;
