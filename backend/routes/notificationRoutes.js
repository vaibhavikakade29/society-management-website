const express = require("express");

const router = express.Router();

const {
    sendNotification,
    getAdminNotifications,
    getResidentNotifications,
    markNotificationAsRead,
    deleteNotification,
    getUnreadCount
} = require("../controllers/notificationController");

const {
    verifyToken,
    verifyAdmin,
    verifyResident
} = require("../middleware/authMiddleware");

/**
 * =====================================================
 * Admin - Send Manual Notification
 * POST /api/notifications
 * =====================================================
 */
router.post(
    "/",
    verifyToken,
    verifyAdmin,
    sendNotification
);

/**
 * =====================================================
 * Admin - Get All Notifications
 * GET /api/notifications/admin
 * =====================================================
 */
router.get(
    "/admin",
    verifyToken,
    verifyAdmin,
    getAdminNotifications
);

/**
 * =====================================================
 * Resident - Get Notifications
 * GET /api/notifications/resident
 * =====================================================
 */
router.get(
    "/resident",
    verifyToken,
    verifyResident,
    getResidentNotifications
);

/**
 * =====================================================
 * Admin/Resident - Mark Notification as Read
 * PUT /api/notifications/:id/read
 * =====================================================
 */
router.put(
    "/:id/read",
    verifyToken,
    markNotificationAsRead
);

/**
 * =====================================================
 * Admin - Delete Notification
 * DELETE /api/notifications/:id
 * =====================================================
 */
router.delete(
    "/:id",
    verifyToken,
    verifyAdmin,
    deleteNotification
);
router.get(
    "/unread-count",
    verifyToken,
    getUnreadCount
);

module.exports = router;