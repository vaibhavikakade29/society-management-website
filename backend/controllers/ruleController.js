const Rule = require("../models/Rule");

/*=========================================================
ADD RULE
=========================================================*/

const addRule = async (req, res) => {

    try {

        const {
            title,
            description,
            category,
            priority,
            isPinned
        } = req.body;

        if (!title || !description) {

            return res.status(400).json({

                success: false,
                message: "Title and Description are required."

            });

        }

        const rule = await Rule.create({

            title,
            description,
            category,
            priority,
            isPinned,
            createdBy: req.user._id

        });

        return res.status(201).json({

            success: true,
            message: "Rule added successfully.",
            rule

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


/*=========================================================
GET ALL RULES
=========================================================*/

const getRules = async (req, res) => {

    try {

        const rules = await Rule.find({

            isActive: true

        })

        .populate(

            "createdBy",
            "fullName"

        )

        .sort({

            isPinned: -1,
            createdAt: -1

        });

        return res.status(200).json({

            success: true,
            count: rules.length,
            rules

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


/*=========================================================
GET RULE BY ID
=========================================================*/

const getRuleById = async (req, res) => {

    try {

        const rule = await Rule.findById(

            req.params.id

        ).populate(

            "createdBy",
            "fullName"

        );

        if (!rule || !rule.isActive) {

            return res.status(404).json({

                success: false,
                message: "Rule not found."

            });

        }

        return res.status(200).json({

            success: true,
            rule

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


/*=========================================================
UPDATE RULE
=========================================================*/

const updateRule = async (req, res) => {

    try {

        const rule = await Rule.findById(

            req.params.id

        );

        if (!rule || !rule.isActive) {

            return res.status(404).json({

                success: false,
                message: "Rule not found."

            });

        }

        rule.title = req.body.title;
        rule.description = req.body.description;
        rule.category = req.body.category;
        rule.priority = req.body.priority;
        rule.isPinned = req.body.isPinned;

        await rule.save();

        return res.status(200).json({

            success: true,
            message: "Rule updated successfully.",
            rule

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


/*=========================================================
DELETE RULE
=========================================================*/

const deleteRule = async (req, res) => {

    try {

        const rule = await Rule.findById(

            req.params.id

        );

        if (!rule || !rule.isActive) {

            return res.status(404).json({

                success: false,
                message: "Rule not found."

            });

        }

        rule.isActive = false;

        await rule.save();

        return res.status(200).json({

            success: true,
            message: "Rule deleted successfully."

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

    addRule,
    getRules,
    getRuleById,
    updateRule,
    deleteRule

};