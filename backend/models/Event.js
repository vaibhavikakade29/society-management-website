const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    eventDate: {
        type: Date,
        required: true
    },

    eventTime: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true,
        trim: true
    },

    status: {
        type: String,
        enum: ["Upcoming", "Completed", "Cancelled"],
        default: "Upcoming"
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    // ✅ ADDED: Soft delete support (same pattern as other modules)
    isActive: {
        type: Boolean,
        default: true
    },

    // ✅ ADDED: Optional audit tracking (who last updated event)
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Event", eventSchema);