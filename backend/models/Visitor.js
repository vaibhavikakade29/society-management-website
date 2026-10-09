const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
{
    // ==========================================
    // Visitor Details
    // ==========================================
    
    visitorName: {
        type: String,
        required: true,
        trim: true
    },

    mobile: {
        type: String,
        required: true,
        trim: true
    },

    purpose: {
        type: String,
        required: true,
        trim: true
    },

    // ==========================================
    // Resident Details
    // ==========================================

    residentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    wing: {
        type: String,
        required: true,
        trim: true
    },

    flatNumber: {
        type: String,
        required: true,
        trim: true
    },

    // ==========================================
    // Visit Details
    // ==========================================

    visitDate: {
        type: Date,
        required: true
    },

    expectedTime: {
        type: String,
        required: true
    },

    expectedPeriod: {
        type: String,
        enum: ["AM", "PM"],
        required: true
    },

    numberOfVisitors: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },

    vehicleNumber: {
        type: String,
        default: "",
        trim: true
    },

    // ==========================================
    // Identity Details
    // ==========================================

    idProofType: {
        type: String,
        default: "",
        trim: true
    },

    idProofNumber: {
        type: String,
        default: "",
        trim: true
    },

    // ==========================================
    // Remarks
    // ==========================================

    remarks: {
        type: String,
        default: "",
        trim: true
    },

    // ==========================================
    // Visitor Status
    // ==========================================

    status: {
        type: String,
        enum: [
            "Pending",
            "Approved",
            "Rejected",
            "Entered",
            "Exited",
            "Cancelled"
        ],
        default: "Pending"
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

    // ==========================================
    // Rejection Information
    // ==========================================

    rejectedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    rejectedAt: {
        type: Date,
        default: null
    },

    // ==========================================
    // Entry Information
    // ==========================================

    entryMarkedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    entryTime: {
        type: Date,
        default: null
    },

    // ==========================================
    // Exit Information
    // ==========================================

    exitMarkedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    exitTime: {
        type: Date,
        default: null
    },

    // ==========================================
    // Cancellation Information
    // ==========================================

    cancelledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    cancelledAt: {
        type: Date,
        default: null
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Visitor", visitorSchema);