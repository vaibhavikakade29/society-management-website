const Visitor = require("../models/Visitor");
const { createNotification } = require("../services/notificationService");

/**
 * =====================================================
 * Resident - Add Visitor Request
 * POST /api/visitors
 * =====================================================
 */
const addVisitor = async (req, res) => {

    try {

        const {
            visitorName,
            mobile,
            purpose,
            visitDate,
            expectedTime,
            expectedPeriod,
            numberOfVisitors,
            vehicleNumber,
            idProofType,
            idProofNumber,
            remarks
        } = req.body;

        // Required Fields
        if (
            !visitorName ||
            !mobile ||
            !purpose ||
            !visitDate ||
            !expectedTime ||
            !expectedPeriod
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        // Mobile Validation
        const mobileRegex = /^[6-9]\d{9}$/;

        if (!mobileRegex.test(mobile)) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid mobile number."
            });
        }

        // Date Validation
        const selectedDate = new Date(visitDate);
        const today = new Date();

        today.setHours(0,0,0,0);
        selectedDate.setHours(0,0,0,0);

        if(selectedDate < today){

            return res.status(400).json({
                success:false,
                message:"Visit date cannot be in past."
            });

        }

        const visitor = await Visitor.create({

            visitorName,

            mobile,

            purpose,

            residentId:req.user._id,

            wing:req.user.wing,

            flatNumber:req.user.flatNo,

            visitDate,

            expectedTime,

            expectedPeriod,

            numberOfVisitors,

            vehicleNumber,

            idProofType,

            idProofNumber,

            remarks

        });

        /**
         * Notify Admin
         */

        await createNotification({

            title:"New Visitor Request",

            message:`${req.user.fullName} has requested visitor permission for ${visitorName}.`,

            category:"Visitor",

            recipientType:"Admin",

            createdBy:req.user._id

        });

        return res.status(201).json({

            success:true,

            message:"Visitor request submitted successfully.",

            visitor

        });

    }

    catch(error){

        console.log(error);

        return res.status(500).json({

            success:false,

            message:"Internal Server Error."

        });

    }

};


/**
 * =====================================================
 * Resident - Get My Visitors
 * GET /api/visitors/my
 * =====================================================
 */

const getMyVisitors = async(req,res)=>{

    try{

        const visitors = await Visitor.find({

            residentId:req.user._id

        })

        .sort({

            createdAt:-1

        });

        return res.status(200).json({

            success:true,

            count:visitors.length,

            visitors

        });

    }

    catch(error){

        console.log(error);

        return res.status(500).json({

            success:false,

            message:"Internal Server Error."

        });

    }

};


/**
 * =====================================================
 * Resident - Cancel Visitor
 * PUT /api/visitors/:id/cancel
 * =====================================================
 */

const cancelVisitor = async(req,res)=>{

    try{

        const visitor = await Visitor.findById(req.params.id);

        if(!visitor){

            return res.status(404).json({

                success:false,

                message:"Visitor request not found."

            });

        }

        // Owner Check

        if(visitor.residentId.toString()!==req.user._id.toString()){

            return res.status(403).json({

                success:false,

                message:"Unauthorized."

            });

        }

        if(visitor.status!=="Pending"){

            return res.status(400).json({

                success:false,

                message:"Only pending request can be cancelled."

            });

        }

        visitor.status="Cancelled";

        visitor.cancelledBy=req.user._id;

        visitor.cancelledAt=new Date();

        await visitor.save();

        /**
         * Notify Admin
         */

        await createNotification({

            title:"Visitor Request Cancelled",

            message:`${req.user.fullName} cancelled visitor request for ${visitor.visitorName}.`,

            category:"Visitor",

            recipientType:"Admin",

            createdBy:req.user._id

        });

        return res.status(200).json({

            success:true,

            message:"Visitor request cancelled successfully."

        });

    }

    catch(error){

        console.log(error);

        return res.status(500).json({

            success:false,

            message:"Internal Server Error."

        });

    }

};
/**
 * =====================================================
 * Admin - Get All Visitors
 * GET /api/visitors
 * =====================================================
 */
const getAllVisitors = async (req, res) => {

    try {

        const visitors = await Visitor.find()

            .populate("residentId", "fullName wing flatNo phone")

            .populate("approvedBy", "fullName")

            .populate("rejectedBy", "fullName")

            .sort({ createdAt: -1 });

        const formattedVisitors = visitors.map(visitor => ({

            _id: visitor._id,

            visitorName: visitor.visitorName,

            mobile: visitor.mobile,

            purpose: visitor.purpose,

            visitDate: visitor.visitDate,

            expectedTime: visitor.expectedTime,

            expectedPeriod: visitor.expectedPeriod,

            numberOfVisitors: visitor.numberOfVisitors,

            vehicleNumber: visitor.vehicleNumber,

            idProofType: visitor.idProofType,

            idProofNumber: visitor.idProofNumber,

            remarks: visitor.remarks,

            status: visitor.status,

            resident: visitor.residentId,

            approvedBy: visitor.approvedBy,

            rejectedBy: visitor.rejectedBy,

            approvedAt: visitor.approvedAt,

            rejectedAt: visitor.rejectedAt,

            entryTime: visitor.entryTime,

            exitTime: visitor.exitTime,

            createdAt: visitor.createdAt

        }));

        return res.status(200).json({

            success: true,

            count: formattedVisitors.length,

            visitors: formattedVisitors || []

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
 * Admin - Approve Visitor
 * PUT /api/visitors/:id/approve
 * =====================================================
 */

const approveVisitor = async (req, res) => {

    try {

        const visitor = await Visitor.findById(req.params.id);

        if (!visitor) {

            return res.status(404).json({

                success: false,

                message: "Visitor request not found."

            });

        }

        if (visitor.status !== "Pending") {

            return res.status(400).json({

                success: false,

                message: `Visitor is already ${visitor.status}.`

            });

        }

        visitor.status = "Approved";

        visitor.approvedBy = req.user._id;

        visitor.approvedAt = new Date();

        await visitor.save();

        /**
         * Notify Resident
         */

        await createNotification({

            title: "Visitor Approved",

            message: `${visitor.visitorName} has been approved by the society administration.`,

            category: "Visitor",

            recipientType: "Resident",

            recipientId: visitor.residentId,

            createdBy: req.user._id

        });

        return res.status(200).json({

            success: true,

            message: "Visitor approved successfully.",

            visitor

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
 * Admin - Reject Visitor
 * PUT /api/visitors/:id/reject
 * =====================================================
 */

const rejectVisitor = async (req, res) => {

    try {

        const visitor = await Visitor.findById(req.params.id);

        if (!visitor) {

            return res.status(404).json({

                success: false,

                message: "Visitor request not found."

            });

        }

        if (visitor.status !== "Pending") {

            return res.status(400).json({

                success: false,

                message: `Visitor is already ${visitor.status}.`

            });

        }

        visitor.status = "Rejected";

        visitor.rejectedBy = req.user._id;

        visitor.rejectedAt = new Date();

        await visitor.save();

        /**
         * Notify Resident
         */

        await createNotification({

            title: "Visitor Rejected",

            message: `${visitor.visitorName} has been rejected by the society administration.`,

            category: "Visitor",

            recipientType: "Resident",

            recipientId: visitor.residentId,

            createdBy: req.user._id

        });

        return res.status(200).json({

            success: true,

            message: "Visitor rejected successfully.",

            visitor

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
 * Admin - Mark Visitor Entry
 * PUT /api/visitors/:id/entry
 * =====================================================
 */

const markVisitorEntry = async (req, res) => {

    try {

        const visitor = await Visitor.findById(req.params.id);

        if (!visitor) {

            return res.status(404).json({
                success: false,
                message: "Visitor request not found."
            });

        }

        if (visitor.status !== "Approved") {

            return res.status(400).json({
                success: false,
                message: "Only approved visitors can be marked as entered."
            });

        }

        visitor.status = "Entered";

        visitor.entryTime = new Date();

        visitor.entryMarkedBy = req.user._id;

        await visitor.save();

        /**
         * Notify Resident
         */

        await createNotification({

            title: "Visitor Entered",

            message: `${visitor.visitorName} has entered the society.`,

            category: "Visitor",

            recipientType: "Resident",

            recipientId: visitor.residentId,

            createdBy: req.user._id

        });

        return res.status(200).json({

            success: true,

            message: "Visitor entry marked successfully.",

            visitor

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
 * Admin - Mark Visitor Exit
 * PUT /api/visitors/:id/exit
 * =====================================================
 */

const markVisitorExit = async (req, res) => {

    try {

        const visitor = await Visitor.findById(req.params.id);

        if (!visitor) {

            return res.status(404).json({
                success: false,
                message: "Visitor request not found."
            });

        }

        if (visitor.status !== "Entered") {

            return res.status(400).json({
                success: false,
                message: "Visitor must enter before exit can be marked."
            });

        }

        visitor.status = "Exited";

        visitor.exitTime = new Date();

        visitor.exitMarkedBy = req.user._id;

        await visitor.save();

        /**
         * Notify Resident
         */

        await createNotification({

            title: "Visitor Exited",

            message: `${visitor.visitorName} has exited the society.`,

            category: "Visitor",

            recipientType: "Resident",

            recipientId: visitor.residentId,

            createdBy: req.user._id

        });

        return res.status(200).json({

            success: true,

            message: "Visitor exit marked successfully.",

            visitor

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
 * Export Controllers
 * =====================================================
 */

module.exports = {

    // Resident

    addVisitor,

    getMyVisitors,

    cancelVisitor,

    // Admin

    getAllVisitors,

    approveVisitor,

    rejectVisitor,

    markVisitorEntry,

    markVisitorExit

};