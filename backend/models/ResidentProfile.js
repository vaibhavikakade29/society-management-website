const mongoose = require("mongoose");

// ==========================================
// Family Member Schema
// ==========================================

const familyMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },

    relation: {
      type: String,
      trim: true,
      default: "",
    },

    dateOfBirth: {
      type: Date,
      default: null,
    },
  },
  {
    _id: false,
  }
);

// ==========================================
// Vehicle Schema
// ==========================================

const vehicleSchema = new mongoose.Schema(
  {
    vehicleType: {
      type: String,
      enum: ["Car", "Bike", "Scooter", "Cycle", "Other"],
      default: "Car",
    },

    vehicleNumber: {
      type: String,
      trim: true,
      default: "",
    },

    parkingSlot: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: false,
  }
);

// ==========================================
// Resident Profile Schema
// ==========================================

const residentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    gender: {
      type: String,
      enum: ["", "Male", "Female", "Other"],
      default: "",
    },

    dateOfBirth: {
      type: Date,
      default: null,
    },

    occupation: {
      type: String,
      default: "",
    },

    moveInDate: {
      type: Date,
      default: null,
    },

    alternatePhone: {
      type: String,
      default: "",
    },

    bloodGroup: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      maxlength: 300,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    familyMembers: {
      type: [familyMemberSchema],
      default: [],
    },

    vehicles: {
      type: [vehicleSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ResidentProfile", residentProfileSchema);