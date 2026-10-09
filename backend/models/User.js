const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    fullName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    role: {
        type: String,
        enum: ["admin", "resident"],
        default: "resident"
    },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },

    userType: {
        type: String,
        enum: ["owner", "tenant", "family"],
        required: true
    },

    committeeRole: {
        type: String,
        default: ""
    },

    ownerName: {
        type: String,
        default: ""
    },

    relationship: {
        type: String,
        default: ""
    },

    wing: {
        type: String,
        required: true
    },

    flatNo: {
        type: String,
        required: true
    },

    emergencyContactName: {
        type: String,
        required: true
    },

    emergencyContactNumber: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    // ==========================================
    // Approval Information
    // ==========================================

    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    approvedAt: {
        type: Date,
        default: null
    },

    rejectedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    rejectedAt: {
        type: Date,
        default: null
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);