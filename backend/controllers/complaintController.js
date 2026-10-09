const Complaint = require("../models/Complaint");
const { createNotification } = require("../services/notificationService");
/**
 * =====================================================
 * Resident - Submit Complaint
 * =====================================================
 */

const submitComplaint = async (req, res) => {

    try {

        const {
            category,
            priority,
            description
        } = req.body;

        // ===========================
        // Validation
        // ===========================

        if (
            !category ||
            !priority ||
            !description
        ) {

            return res.status(400).json({

                success: false,

                message: "Please fill all required fields."

            });

        }

        // ===========================
        // Create Complaint
        // ===========================

        const complaint = await Complaint.create({

            residentId: req.user._id,

            residentName: req.user.fullName,

            flatNo: req.user.flatNo,

            category,

            priority,

            description

        });

        // ===========================
        // Notify Admin
        // ===========================

        await createNotification({

            title: "New Complaint Received",

            message:
                `${req.user.fullName} (${req.user.flatNo}) submitted a ${category} complaint.`,

            category: "Complaint",

            recipientType: "Admin",

            recipientId: null,

            createdBy: req.user._id

        });

        return res.status(201).json({

            success: true,

            message: "Complaint submitted successfully.",

            complaint

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
 * Resident - Get My Complaints
 * =====================================================
 */
const getMyComplaints = async (req, res) => {

    try {

        const complaints = await Complaint.find({

            residentId: req.user._id,

            isActive: true

        })

        .sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            count: complaints.length,

            complaints

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
 * Admin - Get All Complaints
 * =====================================================
 */
const getAllComplaints = async (req, res) => {

    try {

        const complaints = await Complaint.find({

            isActive: true

        })

        .populate("residentId", "fullName wing flatNo phone")

        .sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            count: complaints.length,

            complaints

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
 * Get Complaint By ID
 * =====================================================
 */
const getComplaintById = async (req, res) => {

    try {

        const complaint = await Complaint.findOne({

            _id: req.params.id,

            isActive: true

        })

        .populate("residentId", "fullName wing flatNo phone");

        if (!complaint) {

            return res.status(404).json({

                success: false,

                message: "Complaint not found."

            });

        }

        return res.status(200).json({

            success: true,

            complaint

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
 * Admin - Update Complaint Status
 * =====================================================
 */
const updateComplaintStatus = async (req, res) => {

    try {

        const {

            status,

            adminRemarks

        } = req.body;

        const complaint = await Complaint.findOne({

            _id: req.params.id,

            isActive: true

        });

        if (!complaint) {

            return res.status(404).json({

                success: false,

                message: "Complaint not found."

            });

        }

        complaint.status = status;

        if (adminRemarks !== undefined) {

            complaint.adminRemarks = adminRemarks;

        }

        await complaint.save();



        /**
         * ==========================================
         * Notify Resident
         * ==========================================
         */

        await createNotification({

            title: "Complaint Status Updated",

            message:
                `Your ${complaint.category} complaint is now "${status}".`,

            category: "Complaint",

            recipientType: "Resident",

            recipientId: complaint.residentId,

            createdBy: req.user._id

        });



        return res.status(200).json({

            success: true,

            message: "Complaint updated successfully.",

            complaint

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
 * Admin - Save Remarks
 * =====================================================
 */

const saveRemarks = async (req, res) => {

    try {

        const { adminRemarks } = req.body;

        const complaint = await Complaint.findOne({

            _id: req.params.id,

            isActive: true

        });

        if (!complaint) {

            return res.status(404).json({

                success: false,

                message: "Complaint not found."

            });

        }

        complaint.adminRemarks = adminRemarks;

        await complaint.save();

        /**
         * ==========================================
         * Notify Resident
         * ==========================================
         */

        await createNotification({

            title: "Complaint Remarks Updated",

            message:
                `Admin added remarks for your ${complaint.category} complaint.`,

            category: "Complaint",

            recipientType: "Resident",

            recipientId: complaint.residentId,

            createdBy: req.user._id

        });

        return res.status(200).json({

            success: true,

            message: "Remarks saved successfully.",

            complaint

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
 * Admin - Delete Complaint (Soft Delete)
 * =====================================================
 */

const deleteComplaint = async (req, res) => {

    try {

        const complaint = await Complaint.findOne({

            _id: req.params.id,

            isActive: true

        });

        if (!complaint) {

            return res.status(404).json({

                success: false,

                message: "Complaint not found."

            });

        }

        complaint.isActive = false;

        await complaint.save();

        return res.status(200).json({

            success: true,

            message: "Complaint deleted successfully."

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
module.exports = {

    submitComplaint,

    getMyComplaints,

    getAllComplaints,

    getComplaintById,

    updateComplaintStatus,

    saveRemarks,

    deleteComplaint

};