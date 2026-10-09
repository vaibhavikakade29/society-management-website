const Event = require("../models/Event");
const { createNotification } = require("../services/notificationService");

/**
 * =====================================================
 * CREATE EVENT (ADMIN)
 * =====================================================
 */
const createEvent = async (req, res) => {

    try {

        const {
            title,
            description,
            eventDate,
            eventTime,
            location
        } = req.body;

        // Validation
        if (!title || !description || !eventDate || !eventTime || !location) {

            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });

        }

        const event = await Event.create({
            title,
            description,
            eventDate,
            eventTime,
            location,
            createdBy: req.user._id
        });

        /**
         * ==========================================
         * NOTIFICATION - ALL RESIDENTS
         * ==========================================
         */
        await createNotification({

            title: "New Event Announced 🎉",

            message: `${title} scheduled on ${eventDate} at ${eventTime}.`,

            category: "Event",

            recipientType: "All Residents",

            recipientId: null,

            createdBy: req.user._id

        });

        return res.status(201).json({
            success: true,
            message: "Event created successfully.",
            event
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
 * =====================================================
 * GET ALL EVENTS (ADMIN + RESIDENT)
 * =====================================================
 */
const getAllEvents = async (req, res) => {

    try {

        const events = await Event.find({ isActive: true })
            .populate("createdBy", "fullName email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: events.length,
            events
        });

    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message: "Server Error."
        });

    }
};


/**
 * =====================================================
 * UPDATE EVENT (ADMIN)
 * =====================================================
 */
const updateEvent = async (req, res) => {

    try {

        const event = await Event.findById(req.params.id);

        if (!event) {

            return res.status(404).json({
                success: false,
                message: "Event not found."
            });

        }

        const {
            title,
            description,
            eventDate,
            eventTime,
            location,
            status
        } = req.body;

        if (title) event.title = title;
        if (description) event.description = description;
        if (eventDate) event.eventDate = eventDate;
        if (eventTime) event.eventTime = eventTime;
        if (location) event.location = location;
        if (status) event.status = status;
        event.updatedBy = req.user._id;
        await event.save();

        return res.status(200).json({
            success: true,
            message: "Event updated successfully.",
            event
        });

    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message: "Server Error."
        });

    }
};


/**
 * =====================================================
 * DELETE EVENT (ADMIN)
 * =====================================================
 */
const deleteEvent = async (req, res) => {

    try {

        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found."
            });
        }

        // SOFT DELETE
        event.isActive = false;
        await event.save();

        return res.status(200).json({
            success: true,
            message: "Event deleted successfully."
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error."
        });
    }
};
module.exports = {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent
};