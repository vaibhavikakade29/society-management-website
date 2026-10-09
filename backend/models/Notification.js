const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
{
    // Notification Title
    title: {
        type: String,
        required: true,
        trim: true
    },

    // Notification Message
    message: {
        type: String,
        required: true,
        trim: true
    },

    // Notification Category
    category: {
        type: String,
        enum: [
            "Registration",
            "Visitor",
            "Complaint",
            "Maintenance",
            "Notice",
            "Event",
            "General",
            "Emergency"
        ],
        required: true
    },

    // Recipient Type
    recipientType: {
        type: String,
        enum: [
            "Admin",
            "Resident",
            "All Residents"
        ],
        required: true
    },

    // Specific Resident (only if recipientType = Resident)
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    // Admin who created the notification
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Residents who have read this notification
    readBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    // Soft Delete Support
    isActive: {
        type: Boolean,
        default: true
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Notification", notificationSchema);