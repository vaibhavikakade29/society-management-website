const express = require("express");
const router = express.Router();

const {
    addVisitor,
    getMyVisitors,
    getAllVisitors,
    approveVisitor,
    rejectVisitor,
    markVisitorEntry,
    markVisitorExit,
    cancelVisitor   // ✅ ADDED
} = require("../controllers/visitorController");

const {
    verifyToken,
    verifyAdmin,
    verifyResident
} = require("../middleware/authMiddleware");

// ======================
// RESIDENT
// ======================
router.post("/", verifyToken, verifyResident, addVisitor);
router.get("/my", verifyToken, verifyResident, getMyVisitors);
router.put("/:id/cancel", verifyToken, verifyResident, cancelVisitor); // ✅ FIX

// ======================
// ADMIN
// ======================
router.get("/", verifyToken, verifyAdmin, getAllVisitors);
router.put("/:id/approve", verifyToken, verifyAdmin, approveVisitor);
router.put("/:id/reject", verifyToken, verifyAdmin, rejectVisitor);
router.put("/:id/entry", verifyToken, verifyAdmin, markVisitorEntry);
router.put("/:id/exit", verifyToken, verifyAdmin, markVisitorExit);

module.exports = router;