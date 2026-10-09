const express = require("express");

const router = express.Router();

const {

    register,

    login,

    getCurrentUser,

    logout

} = require("../controllers/authController");

const {

    verifyToken

} = require("../middleware/authMiddleware");

/**
 * ==========================================
 * Public Routes
 * ==========================================
 */

// Register User
router.post(
    "/register",
    register
);

// Login User
router.post(
    "/login",
    login
);

/**
 * ==========================================
 * Protected Routes
 * ==========================================
 */

// Get Current Logged-in User
router.get(
    "/me",
    verifyToken,
    getCurrentUser
);

// Logout User
router.post(
    "/logout",
    verifyToken,
    logout
);

module.exports = router;