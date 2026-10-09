const express = require("express");

const router = express.Router();

const {

    submitComplaint,

    getMyComplaints,

    getAllComplaints,

    getComplaintById,

    updateComplaintStatus,

    saveRemarks,
    deleteComplaint

} = require("../controllers/complaintController");

const {

    verifyToken,

    verifyAdmin,

    verifyResident

} = require("../middleware/authMiddleware");

/**
 * ==========================================
 * Resident Routes
 * ==========================================
 */

router.post(
    "/",
    verifyToken,
    verifyResident,
    submitComplaint
);

router.get(
    "/my",
    verifyToken,
    verifyResident,
    getMyComplaints
);

/**
 * ==========================================
 * Admin Routes
 * ==========================================
 */

router.get(
    "/",
    verifyToken,
    verifyAdmin,
    getAllComplaints
);

router.put(
    "/:id/status",
    verifyToken,
    verifyAdmin,
    updateComplaintStatus
);

router.put(
    "/:id/remarks",
    verifyToken,
    verifyAdmin,
    saveRemarks
);

/**
 * ==========================================
 * Common Route
 * ==========================================
 */

router.get(
    "/:id",
    verifyToken,
    getComplaintById
);
router.delete(
    "/:id",
    verifyToken,
    verifyAdmin,
    deleteComplaint
);

module.exports = router;