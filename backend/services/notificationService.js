const Notification = require("../models/Notification");

/**
 *
 * This service will be used by:
 * - Resident Registration
 * - Visitor Module
 * - Complaint Module
 * - Maintenance Module
 * - Notice Module
 * - Event Module
 *
 */

const createNotification = async ({
    title,
    message,
    category,
    recipientType,
    recipientId = null,
    createdBy
}) => {

    try {

        const notification = await Notification.create({

            title,

            message,

            category,

            recipientType,

            recipientId,

            createdBy

        });

        return notification;

    } catch (error) {

        console.error("Notification Service Error:", error);

        return null;

    }

};

module.exports = {

    createNotification

};