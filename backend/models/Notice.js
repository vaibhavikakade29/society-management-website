const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
{
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    noticeType: {
        type: String,
        enum: ["Maintenance", "Meeting", "Festival", "Emergency", "General"],
        required: true
    },

    visibleTo: {
        type: String,
        enum: ["all", "owner", "tenant", "A", "B", "C", "D", "E", "F", "G"],
        required: true
    },

    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low"
    },

    isPinned: {
        type: Boolean,
        default: false
    },

    expiryDate: {
        type: Date,
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Notice", noticeSchema);