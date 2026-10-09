const express = require("express");

const router = express.Router();

const {

    generateMaintenanceBill,

    getAllMaintenanceBills,

    getMyMaintenanceBills,

    getMaintenanceById,

    submitMaintenancePayment,

    verifyMaintenancePayment,

    rejectMaintenancePayment,

    markCashPaymentReceived,

    updateMaintenanceBill,

    deleteMaintenanceBill

} = require("../controllers/maintenanceController");

const {

    verifyToken,

    verifyAdmin,

    verifyResident

} = require("../middleware/authMiddleware");

/**
 * ==========================================
 * Admin Routes
 * ==========================================
 */

// Generate Maintenance Bill
router.post(
    "/",
    verifyToken,
    verifyAdmin,
    generateMaintenanceBill
);

// Get All Maintenance Bills
router.get(
    "/",
    verifyToken,
    verifyAdmin,
    getAllMaintenanceBills
);

// Verify Online Payment
router.put(
    "/:id/verify",
    verifyToken,
    verifyAdmin,
    verifyMaintenancePayment
);

// Reject Online Payment
router.put(
    "/:id/reject",
    verifyToken,
    verifyAdmin,
    rejectMaintenancePayment
);

// Mark Cash Payment Received
router.put(
    "/:id/cash",
    verifyToken,
    verifyAdmin,
    markCashPaymentReceived
);

// Update Maintenance Bill
router.put(
    "/:id",
    verifyToken,
    verifyAdmin,
    updateMaintenanceBill
);

// Delete Maintenance Bill
router.delete(
    "/:id",
    verifyToken,
    verifyAdmin,
    deleteMaintenanceBill
);

/**
 * ==========================================
 * Resident Routes
 * ==========================================
 */

// Get My Maintenance Bills
router.get(
    "/my",
    verifyToken,
    verifyResident,
    getMyMaintenanceBills
);

// Submit Payment
router.put(
    "/:id/pay",
    verifyToken,
    verifyResident,
    submitMaintenancePayment
);

/**
 * ==========================================
 * Common Route
 * ==========================================
 */

// Get Maintenance Bill By ID
router.get(
    "/:id",
    verifyToken,
    getMaintenanceById
);

module.exports = router;