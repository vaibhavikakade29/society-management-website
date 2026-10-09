const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Verify JWT Token
 */
const verifyToken = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({

                success: false,

                message: "Access Denied. Token Missing."

            });

        }

        const token = authHeader.split(" ")[1];

        // ==========================
        // Verify JWT
        // ==========================
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("\n========== JWT DECODED ==========");
        console.log(decoded);

        // ==========================
        // Get Logged-in User
        // ==========================
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "User not found."

            });

        }

        console.log("\n========== AUTHENTICATED USER ==========");
        console.log({
            id: user._id.toString(),
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            status: user.status
        });
        console.log("========================================\n");

        req.user = user;

        next();

    }

    catch (error) {

        console.log("JWT Verification Error:", error.message);

        return res.status(401).json({

            success: false,

            message: "Invalid or Expired Token."

        });

    }

};

/**
 * Admin Only
 */
const verifyAdmin = (req, res, next) => {

    if (req.user.role !== "admin") {

        return res.status(403).json({

            success: false,

            message: "Admin access only."

        });

    }

    next();

};

/**
 * Resident Only
 */
const verifyResident = (req, res, next) => {

    if (req.user.role !== "resident") {

        return res.status(403).json({

            success: false,

            message: "Resident access only."

        });

    }

    next();

};

module.exports = {

    verifyToken,

    verifyAdmin,

    verifyResident

};