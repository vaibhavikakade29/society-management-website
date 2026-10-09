const User = require("../models/User");

/**
 * ==========================================
 * Admin Authorization Middleware
 * ==========================================
 */
const isAdmin = async (req, res, next) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found."

            });

        }

        if (user.role !== "admin") {

            return res.status(403).json({

                success: false,

                message: "Access denied. Admin only."

            });

        }

        next();

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

    isAdmin

};