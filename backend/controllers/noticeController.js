const Notice = require("../models/Notice");
const { createNotification } = require("../services/notificationService");
const createNotice = async (req, res) => {
    try {
        const {
            title,
            description,
            noticeType,
            visibleTo,
            priority,
            isPinned,
            expiryDate
        } = req.body;

        if (!title || !description || !noticeType || !visibleTo || !expiryDate) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        const expiry = new Date(expiryDate);
        const today = new Date();
        today.setHours(0,0,0,0);
        expiry.setHours(0,0,0,0);

        if (expiry < today) {
            return res.status(400).json({
                success: false,
                message: "Expiry date cannot be in past."
            });
        }

        const notice = await Notice.create({
            title,
            description,
            noticeType,
            visibleTo,
            priority,
            isPinned,
            expiryDate,
            createdBy: req.user._id
        });

        await createNotification({
            title: "New Notice",
            message: title,
            category: "Notice",
            recipientType: "All Residents",
            createdBy: req.user._id
        });

        return res.status(201).json({
            success: true,
            message: "Notice created successfully",
            notice
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
/**
 * =====================================================
 * Get All Notices
 * GET /api/notices
 * =====================================================
 */
const getAllNotices = async (req, res) => {
    try {
        const notices = await Notice.find({ isActive: true })
            .populate("createdBy", "fullName role")
            .sort({ isPinned: -1, createdAt: -1 });

        return res.status(200).json({
            success: true,
            notices
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
/**
 * =====================================================
 * Get Notice By ID
 * GET /api/notices/:id
 * =====================================================
 */

const getNoticeById = async (req, res) => {

    try {

        const notice = await Notice.findOne({

            _id: req.params.id,

            isActive: true

        })

        .populate("createdBy", "fullName role");

        if (!notice) {

            return res.status(404).json({

                success: false,

                message: "Notice not found."

            });

        }

        return res.status(200).json({

            success: true,

            notice

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error."

        });

    }

};
/**
 * =====================================================
 * Update Notice
 * PUT /api/notices/:id
 * =====================================================
 */
const updateNotice = async (req, res) => {
    try {

        const notice = await Notice.findById(req.params.id);

        if (!notice || !notice.isActive) {
            return res.status(404).json({
                success: false,
                message: "Notice not found"
            });
        }

        const {
            title,
            description,
            noticeType,
            visibleTo,
            priority,
            isPinned,
            expiryDate
        } = req.body;

        if (title !== undefined) notice.title = title;
        if (description !== undefined) notice.description = description;
        if (noticeType !== undefined) notice.noticeType = noticeType;
        if (visibleTo !== undefined) notice.visibleTo = visibleTo;
        if (priority !== undefined) notice.priority = priority;
        if (isPinned !== undefined) notice.isPinned = isPinned;
        if (expiryDate !== undefined) notice.expiryDate = expiryDate;

        await notice.save();

        return res.status(200).json({
            success: true,
            message: "Notice updated successfully",
            notice
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
/**
 * =====================================================
 * Delete Notice (Soft Delete)
 * DELETE /api/notices/:id
 * =====================================================
 */
const deleteNotice = async (req, res) => {
    try {

        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({
                success: false,
                message: "Notice not found"
            });
        }

        notice.isActive = false;
        await notice.save();

        return res.status(200).json({
            success: true,
            message: "Notice deleted successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
module.exports = {

    createNotice,

    getAllNotices,

    getNoticeById,

    updateNotice,

    deleteNotice

};