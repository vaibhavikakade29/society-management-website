const User = require("../models/User");
const bcrypt = require("bcrypt");

const createDefaultAdmin = async () => {

    try {

        /**
         * Check Existing Admin
         */
        const adminExists = await User.findOne({

            role: "admin"

        });

        if (adminExists) {

            console.log("Default Admin already exists.");

            return;

        }

        /**
         * Encrypt Password
         */
        const hashedPassword = await bcrypt.hash(
            "Vighnahar@101",
            10
        );

        /**
         * Create Admin
         */
        const admin = new User({

                fullName: "Vinayak Gajanan Patil",

                email: "vighnahar101@gmail.com",

                phone: "9632587410",

                role: "admin",

                status: "approved",

                userType: "owner",

                committeeRole: "Chairman",

                ownerName: "",

                relationship: "",

                wing: "A",

                flatNo: "A-101",

                emergencyContactName: "Vinayak Gajanan Patil",

                emergencyContactNumber: "9632587410",

                password: hashedPassword

            });
        await admin.save();

        console.log("Default Admin Created Successfully.");

    }

    catch (error) {

        console.log("Admin Seeder Error");

        console.log(error);

    }

};

module.exports = createDefaultAdmin;