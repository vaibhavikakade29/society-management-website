const Maintenance = require("../models/Maintenance");
const User = require("../models/User");
const { createNotification } = require("../services/notificationService");

/**
 * =====================================================
 * Admin - Generate Maintenance Bill
 * POST /api/maintenance
 * =====================================================
 */

const generateMaintenanceBill = async (req, res) => {

    try {

        const {

            residentId,

            billMonth,

            billYear,

            maintenanceAmount,

            dueDate,

            remarks

        } = req.body;

        // ======================================
        // Validation
        // ======================================

        if (

            !residentId ||

            !billMonth ||

            !billYear ||

            !maintenanceAmount ||

            !dueDate

        ) {

            return res.status(400).json({

                success: false,

                message: "Please fill all required fields."

            });

        }

        // ======================================
        // Find Resident
        // ======================================

        const resident = await User.findById(residentId);

        if (!resident) {

            return res.status(404).json({

                success: false,

                message: "Resident not found."

            });

        }

        // ======================================
        // Prevent Duplicate Bill
        // ======================================

        const existingBill = await Maintenance.findOne({

            residentId,

            billMonth,

            billYear,

            isActive: true

        });

        if (existingBill) {

            return res.status(400).json({

                success: false,

                message: "Maintenance bill already generated."

            });

        }

        // ======================================
        // Create Bill
        // ======================================

        const maintenance = await Maintenance.create({

            residentId: resident._id,

            residentName: resident.fullName,

            flatNo: resident.flatNo,

            billMonth,

            billYear,

            maintenanceAmount,

            dueDate,

            remarks,

            generatedBy: req.user._id

        });

        // ======================================
        // Notify Resident
        // ======================================

        await createNotification({

            title: "New Maintenance Bill",

            message:
                `Maintenance bill for ${billMonth} ${billYear} has been generated.`,

            category: "Maintenance",

            recipientType: "Resident",

            recipientId: resident._id,

            createdBy: req.user._id

        });

        return res.status(201).json({

            success: true,

            message: "Maintenance bill generated successfully.",

            maintenance

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
 * Admin - Get All Maintenance Bills
 * GET /api/maintenance
 * =====================================================
 */
const getAllMaintenanceBills = async (req, res) => {

    try {

        const maintenanceBills = await Maintenance.find({

            isActive: true

        })

        .populate("residentId", "fullName wing flatNo email phone")

        .populate("generatedBy", "fullName")

        .populate("verifiedBy", "fullName")

        .sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            count: maintenanceBills.length,

            maintenanceBills

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
 * Resident - Get My Maintenance Bills
 * GET /api/maintenance/my
 * =====================================================
 */
const getMyMaintenanceBills = async (req, res) => {

    try {

        const maintenanceBills = await Maintenance.find({

            residentId: req.user._id,

            isActive: true

        })

        .sort({

            billYear: -1,

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            count: maintenanceBills.length,

            maintenanceBills

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
 * Get Maintenance Bill By ID
 * GET /api/maintenance/:id
 * =====================================================
 */
const getMaintenanceById = async (req, res) => {

    try {

        const maintenance = await Maintenance.findById(req.params.id)

        .populate("residentId", "fullName wing flatNo email phone")

        .populate("generatedBy", "fullName")

        .populate("verifiedBy", "fullName");

        if (!maintenance) {

            return res.status(404).json({

                success: false,

                message: "Maintenance bill not found."

            });

        }

        return res.status(200).json({

            success: true,

            maintenance

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
const submitMaintenancePayment = async (req, res) => {

    try {

        const {
            paymentMode,
            transactionId,
            paymentDate,
            remarks
        } = req.body;

        const maintenance = await Maintenance.findById(req.params.id);

        if (!maintenance) {

            return res.status(404).json({

                success: false,
                message: "Maintenance bill not found."

            });

        }

        // Only owner of bill can pay
        if (maintenance.residentId.toString() !== req.user._id.toString()) {

            return res.status(403).json({

                success: false,
                message: "Unauthorized access."

            });

        }

        // Prevent double payment submission
        if (maintenance.status === "Paid") {

            return res.status(400).json({

                success: false,
                message: "Bill already paid."

            });

        }

        maintenance.paymentMode = paymentMode;
        maintenance.transactionId = transactionId;
        maintenance.paymentDate = paymentDate || new Date();
        maintenance.remarks = remarks;
        maintenance.status = "Payment Verification";

        await maintenance.save();

        // 🔔 Notify Admin
        await createNotification({

            title: "Payment Submitted",

            message: `Payment submitted for maintenance bill (${maintenance.billMonth} ${maintenance.billYear}).`,

            category: "Maintenance",

            recipientType: "Admin",

            recipientId: null,

            createdBy: req.user._id

        });

        return res.status(200).json({

            success: true,
            message: "Payment submitted successfully.",
            maintenance

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
const verifyMaintenancePayment = async (req, res) => {

    try {

        const maintenance = await Maintenance.findById(req.params.id);

        if (!maintenance) {

            return res.status(404).json({

                success: false,
                message: "Maintenance bill not found."

            });

        }

        maintenance.status = "Paid";
        maintenance.verifiedBy = req.user._id;
        maintenance.verifiedAt = new Date();

        await maintenance.save();

        // 🔔 Notify Resident
        await createNotification({

            title: "Payment Approved",

            message: `Your maintenance payment for ${maintenance.billMonth} ${maintenance.billYear} has been approved.`,

            category: "Maintenance",

            recipientType: "Resident",

            recipientId: maintenance.residentId,

            createdBy: req.user._id

        });

        return res.status(200).json({

            success: true,
            message: "Payment verified successfully.",
            maintenance

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
const rejectMaintenancePayment = async (req, res) => {

    try {

        const { remarks } = req.body;

        const maintenance = await Maintenance.findById(req.params.id);

        if (!maintenance) {

            return res.status(404).json({

                success: false,
                message: "Maintenance bill not found."

            });

        }

        maintenance.status = "Pending";
        maintenance.remarks = remarks || "Payment rejected";

        await maintenance.save();

        // 🔔 Notify Resident
        await createNotification({

            title: "Payment Rejected",

            message: `Your maintenance payment for ${maintenance.billMonth} ${maintenance.billYear} was rejected. Please re-submit.`,

            category: "Maintenance",

            recipientType: "Resident",

            recipientId: maintenance.residentId,

            createdBy: req.user._id

        });

        return res.status(200).json({

            success: true,
            message: "Payment rejected successfully.",
            maintenance

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
const markCashPaymentReceived = async (req, res) => {

    try {

        const maintenance = await Maintenance.findById(req.params.id);

        if (!maintenance) {

            return res.status(404).json({

                success: false,
                message: "Maintenance bill not found."

            });

        }

        maintenance.status = "Paid";
        maintenance.paymentMode = "Cash";
        maintenance.paymentDate = new Date();
        maintenance.verifiedBy = req.user._id;
        maintenance.verifiedAt = new Date();

        await maintenance.save();

        // 🔔 Notify Resident
        await createNotification({

            title: "Cash Payment Received",

            message: `Cash payment for ${maintenance.billMonth} ${maintenance.billYear} has been received and verified.`,

            category: "Maintenance",

            recipientType: "Resident",

            recipientId: maintenance.residentId,

            createdBy: req.user._id

        });

        return res.status(200).json({

            success: true,
            message: "Cash payment marked as received.",
            maintenance

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
const updateMaintenanceBill = async (req, res) => {

    try {

        const maintenance = await Maintenance.findById(req.params.id);

        if (!maintenance) {

            return res.status(404).json({

                success: false,
                message: "Maintenance bill not found."

            });

        }

        const {
            maintenanceAmount,
            dueDate,
            remarks
        } = req.body;

        if (maintenanceAmount) maintenance.maintenanceAmount = maintenanceAmount;
        if (dueDate) maintenance.dueDate = dueDate;
        if (remarks) maintenance.remarks = remarks;

        await maintenance.save();

        return res.status(200).json({

            success: true,
            message: "Maintenance bill updated successfully.",
            maintenance

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
const deleteMaintenanceBill = async (req, res) => {

    try {

        const maintenance = await Maintenance.findById(req.params.id);

        if (!maintenance) {

            return res.status(404).json({

                success: false,
                message: "Maintenance bill not found."

            });

        }

        maintenance.isActive = false;

        await maintenance.save();

        return res.status(200).json({

            success: true,
            message: "Maintenance bill deleted successfully."

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

    generateMaintenanceBill,
    getAllMaintenanceBills,
    getMyMaintenanceBills,
    getMaintenanceById,

    submitMaintenancePayment,
    verifyMaintenancePayment,
    rejectMaintenancePayment,

    markCashPaymentReceived,
    updateMaintenanceBill,
    deleteMaintenanceBill

};