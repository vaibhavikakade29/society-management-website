const Notification = require("../models/Notification");
const { createNotification } = require("../services/notificationService");

/**
 * ======================================================
 * Admin - Send Manual Notification
 * POST /api/notifications
 * ======================================================
 */
const sendNotification = async (req, res) => {

    try {

        const {
            title,
            message,
            category,
            recipientType,
            recipientId
        } = req.body;

        // Validation
        if (
            !title ||
            !message ||
            !category ||
            !recipientType
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        // Resident notification requires residentId
        if (
            recipientType === "Resident" &&
            !recipientId
        ) {
            return res.status(400).json({
                success: false,
                message: "Resident ID is required."
            });
        }

        const notification = await createNotification({

            title,

            message,

            category,

            recipientType,

            recipientId: recipientId || null,

            createdBy: req.user._id

        });

        return res.status(201).json({

            success: true,

            message: "Notification sent successfully.",

            notification

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error."

        });

    }

};

/**
 * ======================================================
 * Admin - Get All Notifications
 * GET /api/notifications/admin
 * ======================================================
 */
const getAdminNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find({

            isActive: true,
            recipientType: "Admin"

        })

        .populate("createdBy", "fullName")

        .sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            count: notifications.length,

            notifications

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error."

        });

    }

};
/**
 * ======================================================
 * Resident - Get Notifications
 * GET /api/notifications/resident
 * ======================================================
 */
const getResidentNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find({

            isActive: true,

            $or: [

                {
                    recipientType: "All Residents"
                },

                {
                    recipientType: "Resident",
                    recipientId: req.user._id
                }

            ]

        })

        .populate("createdBy", "fullName")

        .sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            count: notifications.length,

            notifications

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error."

        });

    }

};

/**
 * ======================================================
 * Resident/Admin - Mark Notification as Read
 * PUT /api/notifications/:id/read
 * ======================================================
 */
const markNotificationAsRead = async (req, res) => {

    try {

        const notification = await Notification.findById(req.params.id);

        if (!notification) {

            return res.status(404).json({

                success: false,

                message: "Notification not found."

            });

        }

        const alreadyRead = notification.readBy.some(

            userId =>

                userId.toString() === req.user._id.toString()

        );

        if (!alreadyRead) {

            notification.readBy.push(req.user._id);

            await notification.save();

        }

        return res.status(200).json({

            success: true,

            message: "Notification marked as read."

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error."

        });

    }

};

/**
 * ======================================================
 * Admin - Delete Notification
 * DELETE /api/notifications/:id
 * ======================================================
 */
const deleteNotification = async (req, res) => {

    try {

        const notification = await Notification.findById(req.params.id);

        if (!notification) {

            return res.status(404).json({

                success: false,

                message: "Notification not found."

            });

        }

        notification.isActive = false;

        await notification.save();

        return res.status(200).json({

            success: true,

            message: "Notification deleted successfully."

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error."

        });

    }

};
/**
 * ======================================================
 * Get Unread Notification Count
 * GET /api/notifications/unread-count
 * ======================================================
 */

const getUnreadCount = async (req, res) => {

    try {

        let filter = {

            isActive: true,

            readBy: {
                $ne: req.user._id
            }

        };

        if (req.user.role === "admin") {

            // Admin notifications
            filter.$or = [

                { recipientType: "Admin" }

            ];

        } else {

            // Resident notifications
            filter.$or = [

                {
                    recipientType: "Resident",
                    recipientId: req.user._id
                },

                {
                    recipientType: "All Residents"
                }

            ];

        }

        const count = await Notification.countDocuments(filter);

        return res.status(200).json({

            success: true,

            count

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error."

        });

    }

};

module.exports = {

    sendNotification,

    getAdminNotifications,

    getResidentNotifications,

    markNotificationAsRead,

    deleteNotification,
    getUnreadCount

};