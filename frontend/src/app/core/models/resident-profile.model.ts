// ==============================
// Family Member
// ==============================

export interface FamilyMember {
  name: string;
  relation: string;
  dateOfBirth: string;
}

// ==============================
// Vehicle
// ==============================

export interface Vehicle {
  vehicleType: string;
  vehicleNumber: string;
  parkingSlot: string;
}

// ==============================
// User Model
// (Data from User Collection)
// ==============================

export interface User {

  _id?: string;

  fullName: string;

  email: string;

  phone: string;

  role: string;

  status: string;

  userType: string;

  committeeRole: string;

  ownerName: string;

  relationship: string;

  wing: string;

  flatNo: string;

  emergencyContactName: string;

  emergencyContactNumber: string;

}

// ==============================
// Resident Profile
// (Data from ResidentProfile Collection)
// ==============================

export interface ResidentProfile {

  _id?: string;

  userId?: string;

  gender: string;

  dateOfBirth: string;

  occupation: string;

  moveInDate: string;

  alternatePhone: string;

  bloodGroup: string;

  bio: string;

  profileImage: string;

  familyMembers: FamilyMember[];

  vehicles: Vehicle[];

}

// ==============================
// API Response
// ==============================

export interface ProfileResponse {

  success: boolean;

  message: string;

  data: {

    user: User;

    profile: ResidentProfile;

  };

}