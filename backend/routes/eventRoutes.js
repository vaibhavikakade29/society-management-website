const express = require("express");
const router = express.Router();

const {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController");

const {
    verifyToken,
    verifyAdmin
} = require("../middleware/authMiddleware");

// ADMIN ONLY
router.post("/", verifyToken, verifyAdmin, createEvent);
router.put("/:id", verifyToken, verifyAdmin, updateEvent);
router.delete("/:id", verifyToken, verifyAdmin, deleteEvent);

// PUBLIC (Admin + Resident)
router.get("/", verifyToken, getAllEvents);

module.exports = router;