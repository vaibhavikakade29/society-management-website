const express = require("express");
const router = express.Router();

const {
    createNotice,
    getAllNotices,
    getNoticeById,
    updateNotice,
    deleteNotice
} = require("../controllers/noticeController");

const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, createNotice);
router.get("/", verifyToken, getAllNotices);
router.get("/:id", verifyToken, getNoticeById);
router.put("/:id", verifyToken, updateNotice);
router.delete("/:id", verifyToken, deleteNotice);

module.exports = router;