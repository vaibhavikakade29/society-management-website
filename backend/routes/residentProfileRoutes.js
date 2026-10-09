const express = require("express");

const router = express.Router();

const {
  getResidentProfile,
  updateResidentProfile
} = require("../controllers/residentProfileController");

const {
  verifyToken,
  verifyResident
} = require("../middleware/authMiddleware");

// ==========================================
// GET PROFILE
// ==========================================

router.get(
  "/",
  verifyToken,
  verifyResident,
  getResidentProfile
);

// ==========================================
// UPDATE PROFILE
// ==========================================

router.put(
  "/",
  verifyToken,
  verifyResident,
  updateResidentProfile
);

module.exports = router;