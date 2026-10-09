const User = require("../models/User");

const { createNotification } = require("../services/notificationService");
const getAllResidents = async (req, res) => {
    try {
        const residents = await User.find({ role: "resident"}).select("-password")
        .sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            count: residents.length,
            residents
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
const approveResident = async (req, res) => {
    try {
        const { id } = req.params;
        const resident = await User.findById(id);
        if (!resident) {
            return res.status(404).json({
                success: false,
                message: "Resident not found."
            });
        }
        // Only resident accounts can be approved
        if (resident.role !== "resident") {
            return res.status(400).json({
                success: false,
                message: "Only resident accounts can be approved."
            });
        }
        // Already approved
        if (resident.status === "approved") {
            return res.status(409).json({
                success: false,
                message: "Resident is already approved."
            });
        }
        // Already rejected
        if (resident.status === "rejected") {
            return res.status(409).json({
                success: false,
                message: "Rejected resident cannot be approved."
            });
        }
        resident.status = "approved";
        resident.approvedBy = req.user._id;
        resident.approvedAt = new Date();
        await resident.save();
        await createNotification({
            title: "Registration Approved",
            message:
                "Congratulations! Your registration has been approved. You can now log in to the Society Management System.",
            category: "Registration",
            recipientType: "Resident",
            recipientId: resident._id,
            createdBy: req.user._id
        });
        return res.status(200).json({
            success: true,
            message: "Resident approved successfully.",
            resident
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
const rejectResident = async (req, res) => {
    try {
        const { id } = req.params;
        const resident = await User.findById(id);
        if (!resident) {
            return res.status(404).json({
                success: false,
                message: "Resident not found."
            });
        }
        // Only resident accounts can be rejected
        if (resident.role !== "resident") {
            return res.status(400).json({
                success: false,
                message: "Only resident accounts can be rejected."
            });
        }
        // Already rejected
        if (resident.status === "rejected") {
            return res.status(409).json({
                success: false,
                message: "Resident is already rejected."
            });
        }
        // Already approved
        if (resident.status === "approved") {
            return res.status(409).json({
                success: false,
                message: "Approved resident cannot be rejected."
            });
        }
        resident.status = "rejected";
        resident.rejectedBy = req.user._id;
        resident.rejectedAt = new Date();
        await resident.save();
        await createNotification({
            title: "Registration Rejected",
            message:
                "Your registration request has been rejected. Please contact the society administration for further details.",
            category: "Registration",
            recipientType: "Resident",
            recipientId: resident._id,
            createdBy: req.user._id
        });
        return res.status(200).json({
            success: true,
            message: "Resident rejected successfully.",
            resident
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
    getAllResidents,
    approveResident,
    rejectResident
};