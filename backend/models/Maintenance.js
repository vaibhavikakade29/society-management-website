const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({

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

    billMonth: {
        type: String,
        required: true
    },

    billYear: {
        type: Number,
        required: true
    },

    maintenanceAmount: {
        type: Number,
        required: true,
        min: 0
    },

    dueDate: {
        type: Date,
        required: true
    },

    paymentDate: {
        type: Date,
        default: null
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Cash Pending",
            "Payment Verification",
            "Paid",
            "Overdue"
        ],
        default: "Pending"
    },

    paymentMode: {
        type: String,
        enum: [
            "",
            "Cash",
            "UPI",
            "Net Banking"
        ],
        default: ""
    },

    transactionId: {
        type: String,
        default: ""
    },

    paymentProof: {
        type: String,
        default: ""
    },

    remarks: {
        type: String,
        default: ""
    },

    generatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    verifiedAt: {
        type: Date,
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

module.exports = mongoose.model(
    "Maintenance",
    maintenanceSchema
);