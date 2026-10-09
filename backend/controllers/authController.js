const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createNotification } = require("../services/notificationService");
/**
 * ==========================================
 * Register User
 * ==========================================
 */
const register = async (req, res) => {

    try {
        const {  fullName,email,phone,userType,committeeRole,ownerName,relationship,
                 wing,flatNo,emergencyContactName,emergencyContactNumber,password,confirmPassword
              } = req.body;

        /**
         * Required Fields
         */
        if ( !fullName || !email ||!phone ||!userType ||!wing ||!flatNo ||
            !emergencyContactName ||!emergencyContactNumber ||!password ||!confirmPassword
           ) {

            return res.status(400).json({

                success: false,

                message: "Please fill all required fields."

            });

        }

        /**
         * Password Match
         */
        if (password !== confirmPassword) {

            return res.status(400).json({

                success: false,

                message: "Passwords do not match."

            });

        }

        /**
         * Duplicate Email
         */
        const emailExists = await User.findOne({

            email: email.toLowerCase()

        });

        if (emailExists) {

            return res.status(400).json({

                success: false,

                message: "Email already registered."

            });

        }

        /**
         * Duplicate Phone
         */
        const phoneExists = await User.findOne({

            phone

        });

        if (phoneExists) {

            return res.status(400).json({

                success: false,

                message: "Phone number already registered."

            });

        }

        /**
         * Only One Owner Per Flat
         */
        if (userType === "owner") {

            const ownerExists = await User.findOne({

                userType: "owner",

                wing,

                flatNo

            });

            if (ownerExists) {

                return res.status(400).json({

                    success: false,

                    message: "Owner already exists for this flat."

                });

            }

        }

        /**
         * Encrypt Password
         */
        const hashedPassword = await bcrypt.hash(password,10);

        /**
         * Create User
         */
        const newUser = new User({fullName,email: email.toLowerCase(),phone,
                        role: "resident",status: "pending",userType,
                        committeeRole:
                            userType === "owner"
                                ? committeeRole
                                : "",

                        ownerName:
                            userType === "tenant"
                                ? ownerName
                                : "",

                         relationship:
                                userType === "family"
                                    ? relationship
                                    : "",

                            wing,

                            flatNo,

                            emergencyContactName,

                            emergencyContactNumber,

                            password: hashedPassword

        });

        await newUser.save();
        /**
         * ==========================================
         * Notify Admin about New Resident Registration
         * ==========================================
         */
        await createNotification({

            title: "New Resident Registration",

            message: `${newUser.fullName} has submitted a registration request for Flat ${newUser.wing}-${newUser.flatNo}.`,

            category: "Registration",

            recipientType: "Admin",

            createdBy: newUser._id

        });

        return res.status(201).json({

            success: true,

            message:
                "Registration submitted successfully. Please wait for Admin approval."

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};
/**
 * ==========================================
 * Login User
 * ==========================================
 */
const login = async (req, res) => {

    try {

        const {

            email,
            password

        } = req.body;

        /**
         * Required Fields
         */
        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message: "Email/Mobile Number and Password are required."

            });

        }

        /**
         * Find User by Email OR Phone
         */
        const user = await User.findOne({

            $or: [

                {
                    email: email.toLowerCase()
                },

                {
                    phone: email
                }

            ]

        });

        /**
         * User Not Found
         */
        if (!user) {

            return res.status(401).json({

                success: false,

                message: "Invalid Email/Mobile Number or Password."

            });

        }

        /**
         * Check Password
         */
        const isPasswordMatched = await bcrypt.compare(

            password,

            user.password

        );

        if (!isPasswordMatched) {

            return res.status(401).json({

                success: false,

                message: "Invalid Email/Mobile Number or Password."

            });

        }

        /**
         * Resident Approval Check
         */
        if (user.role === "resident") {

            if (user.status === "pending") {

                return res.status(403).json({

                    success: false,

                    message:
                        "Your registration is pending Admin approval."

                });

            }

            if (user.status === "rejected") {

                return res.status(403).json({

                    success: false,

                    message:
                        "Your registration request has been rejected."

                });

            }

        }

        /**
         * Generate JWT Token
         */
        const token = jwt.sign(

            {

                id: user._id,

                role: user.role

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "1d"

            }

        );

        /**
         * Remove Password
         */
        const userData = user.toObject();

        delete userData.password;

        /**
         * Success
         */
        return res.status(200).json({

            success: true,

            message: "Login Successful.",

            token,

            user: userData

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
 * ==========================================
 * Get Current Logged-in User
 * ==========================================
 */
const getCurrentUser = async (req, res) => {

    try {

        const user = await User.findById(req.user._id)
            .select("-password");

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found."

            });

        }

        return res.status(200).json({

            success: true,

            user

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
 * ==========================================
 * Logout User
 * ==========================================
 */
const logout = async (req, res) => {

    return res.status(200).json({

        success: true,

        message: "Logout Successful."

    });

};
module.exports = {register,login,getCurrentUser,logout};