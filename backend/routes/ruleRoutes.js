const express = require("express");

const router = express.Router();

const {

    addRule,
    getRules,
    getRuleById,
    updateRule,
    deleteRule

} = require("../controllers/ruleController");

const {

    verifyToken,
    verifyAdmin

} = require("../middleware/authMiddleware");

/* Resident + Admin */

router.get("/", verifyToken, getRules);

router.get("/:id", verifyToken, getRuleById);

/* Admin Only */

router.post("/", verifyToken, verifyAdmin, addRule);

router.put("/:id", verifyToken, verifyAdmin, updateRule);

router.delete("/:id", verifyToken, verifyAdmin, deleteRule);

module.exports = router;