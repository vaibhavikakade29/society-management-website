const mongoose = require("mongoose");
require("dotenv").config();

const Rule = require("./models/Rule");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

    console.log("MongoDB Connected");

    await Rule.deleteMany({});

    await Rule.insertMany([

        {
            title: "Maintain Silence",
            description: "Avoid loud music, shouting or any activities that disturb other residents, especially between 10:00 PM and 6:00 AM.",
            category: "General",
            priority: "High",
            isPinned: true
        },

        {
            title: "Visitor Entry",
            description: "All visitors must register at the security gate before entering the society premises.",
            category: "Security",
            priority: "High",
            isPinned: true
        },

        {
            title: "Parking Rules",
            description: "Residents should park only in their allotted parking spaces. Visitor parking should be used only for guests.",
            category: "Parking",
            priority: "Normal",
            isPinned: false
        },

        {
            title: "Waste Segregation",
            description: "Separate wet and dry waste before disposing it into designated collection bins.",
            category: "Cleanliness",
            priority: "High",
            isPinned: false
        },

        {
            title: "Pet Responsibility",
            description: "Pet owners must clean up after their pets and ensure pets do not disturb other residents.",
            category: "Pets",
            priority: "Normal",
            isPinned: false
        },

        {
            title: "Common Area Usage",
            description: "Children and residents should keep common areas clean and avoid damaging society property.",
            category: "General",
            priority: "Normal",
            isPinned: false
        },

        {
            title: "Maintenance Payment",
            description: "Maintenance charges should be paid before the due date to avoid late payment penalties.",
            category: "Finance",
            priority: "High",
            isPinned: true
        },

        {
            title: "Fire Safety",
            description: "Do not block emergency exits. Report any fire hazards immediately to the management committee.",
            category: "Safety",
            priority: "High",
            isPinned: true
        },

        {
            title: "Use of Clubhouse",
            description: "Residents must book the clubhouse in advance and maintain cleanliness after use.",
            category: "Facilities",
            priority: "Normal",
            isPinned: false
        },

        {
            title: "Report Complaints",
            description: "Residents should report maintenance issues or complaints through the Society Management System.",
            category: "General",
            priority: "Normal",
            isPinned: false
        }

    ]);

    console.log("Default Rules Inserted Successfully");

    process.exit();

})
.catch(err => {

    console.log(err);

});