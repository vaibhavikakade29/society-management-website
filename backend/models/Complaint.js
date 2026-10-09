const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({

    residentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    residentName: {
        type: String,
        required: true,
        trim: true
    },

    flatNo: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        enum: [
            "Electrical",
            "Plumbing",
            "Lift",
            "Security",
            "Cleaning",
            "Water",
            "Other"
        ],
        required: true
    },

    priority: {
        type: String,
        enum: [
            "Low",
            "Medium",
            "High"
        ],
        default: "Medium"
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "In Progress",
            "Resolved",
            "Rejected"
        ],
        default: "Pending"
    },

    adminRemarks: {
        type: String,
        default: ""
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    isActive: {
        type: Boolean,
        default: true
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Complaint", complaintSchema);