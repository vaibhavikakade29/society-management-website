const User = require("../models/User");
const ResidentProfile = require("../models/ResidentProfile");

// =======================================================
// GET PROFILE
// =======================================================

const getResidentProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user details
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get resident profile
    let profile = await ResidentProfile.findOne({ userId });

    // If profile doesn't exist, return default object
    if (!profile) {
      profile = {
        gender: "",
        dateOfBirth: null,
        occupation: "",
        moveInDate: null,
        alternatePhone: "",
        bloodGroup: "",
        bio: "",
        profileImage: "",
        familyMembers: [],
        vehicles: [],
      };
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: {
        user,
        profile,
      },
    });
  } catch (error) {
    console.error("Get Resident Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =======================================================
// UPDATE PROFILE
// =======================================================

const updateResidentProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("==================================");
console.log("Requested User ID:", userId);
    // -------------------------
    // Update User
    // -------------------------

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const {
      fullName,
      phone,
      emergencyContactName,
      emergencyContactNumber,

      gender,
      dateOfBirth,
      occupation,
      moveInDate,
      alternatePhone,
      bloodGroup,
      bio,
      profileImage,
      familyMembers,
      vehicles,
    } = req.body;

    // Update User fields
    if (fullName !== undefined) user.fullName = fullName;

    if (phone !== undefined) user.phone = phone;

    if (emergencyContactName !== undefined)
      user.emergencyContactName = emergencyContactName;

    if (emergencyContactNumber !== undefined)
      user.emergencyContactNumber = emergencyContactNumber;

    await user.save();

    // -------------------------
    // Update Resident Profile
    // -------------------------

    let profile = await ResidentProfile.findOne({ userId });
    console.log("Resident Profile:");
console.log(profile);
console.log("==================================");

    if (!profile) {
      profile = new ResidentProfile({
        userId,
      });
    }

    if (gender !== undefined) profile.gender = gender;

    if (dateOfBirth !== undefined) profile.dateOfBirth = dateOfBirth;

    if (occupation !== undefined) profile.occupation = occupation;

    if (moveInDate !== undefined) profile.moveInDate = moveInDate;

    if (alternatePhone !== undefined)
      profile.alternatePhone = alternatePhone;

    if (bloodGroup !== undefined) profile.bloodGroup = bloodGroup;

    if (bio !== undefined) profile.bio = bio;

    if (profileImage !== undefined) profile.profileImage = profileImage;

    if (familyMembers !== undefined)
      profile.familyMembers = familyMembers;

    if (vehicles !== undefined) profile.vehicles = vehicles;

    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user,
        profile,
      },
    });
  } catch (error) {
    console.error("Update Resident Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getResidentProfile,
  updateResidentProfile,
};