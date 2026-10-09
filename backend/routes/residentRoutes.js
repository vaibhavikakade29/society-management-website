const express = require("express");

const router = express.Router();

const {

    getAllResidents,

    approveResident,

    rejectResident

} = require("../controllers/residentController");

const {

    verifyToken

} = require("../middleware/authMiddleware");

const {

    isAdmin

} = require("../middleware/adminMiddleware");

/**
 * ==========================================
 * Residents Routes
 * ==========================================
 */

// Get All Residents
router.get(
    "/",
    verifyToken,
    isAdmin,
    getAllResidents
);

// Approve Resident
router.patch(
    "/:id/approve",
    verifyToken,
    isAdmin,
    approveResident
);

// Reject Resident
router.patch(
    "/:id/reject",
    verifyToken,
    isAdmin,
    rejectResident
);

module.exports = router;