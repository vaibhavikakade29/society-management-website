const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const createDefaultAdmin = require("./config/createAdmin");

const authRoutes = require("./routes/authRoutes");
const flatRoutes = require("./routes/flatRoutes");
const residentRoutes = require("./routes/residentRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const eventRoutes = require("./routes/eventRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const residentProfileRoutes = require("./routes/residentProfileRoutes");
const ruleRoutes = require("./routes/ruleRoutes");
dotenv.config();

connectDB();
createDefaultAdmin();

const app = express();

/**
 * Middleware
 */
app.use(
    cors({
        origin: "http://localhost:4200",
        credentials: true
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/flats", flatRoutes);
app.use("/api/residents", residentRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/complaints",complaintRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/resident-profile", residentProfileRoutes);
app.use("/api/rules", ruleRoutes);
/**
 * Test Route
 */
app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "Society Management Backend Running"

    });

});

/**
 * Invalid Route Handler
 */
app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "API Route Not Found"

    });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});