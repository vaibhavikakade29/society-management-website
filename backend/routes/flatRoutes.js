const express = require("express");

const router = express.Router();

const {
    getAvailableFlats
} = require("../controllers/flatController");

router.get("/available/:wing", getAvailableFlats);

module.exports = router;