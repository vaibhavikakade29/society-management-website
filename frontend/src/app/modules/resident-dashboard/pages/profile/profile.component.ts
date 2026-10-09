import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import {
  User,
  ResidentProfile
} from 'src/app/core/models/resident-profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loading = false;
  isEditMode = false;

  user: User = {} as User;

  profile: ResidentProfile = {
    gender: '',
    dateOfBirth: '',
    occupation: '',
    moveInDate: '',
    alternatePhone: '',
    bloodGroup: '',
    bio: '',
    profileImage: '',
    familyMembers: [],
    vehicles: []
  };

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  // ==========================
  // Load Profile
  // ==========================

  loadProfile(): void {

    this.loading = true;

    this.profileService.getProfile().subscribe({

      next: (res: any) => {

        this.user = res.data.user;
        this.profile = res.data.profile;

        this.loading = false;

      },

      error: (err) => {

        console.error(err);

        this.loading = false;

      }

    });

  }

  // ==========================
  // Toggle Edit Mode
  // ==========================

  toggleEdit(): void {

    if (this.isEditMode) {

      this.isEditMode = false;

      this.loadProfile();

    } else {

      this.isEditMode = true;

    }

  }

  // ==========================
  // Save Profile
  // ==========================

  saveProfile(): void {

  const data = {

    fullName: this.user.fullName,

    phone: this.user.phone,

    emergencyContactName: this.user.emergencyContactName,

    emergencyContactNumber: this.user.emergencyContactNumber,

    gender: this.profile.gender,

    dateOfBirth: this.profile.dateOfBirth,

    occupation: this.profile.occupation,

    moveInDate: this.profile.moveInDate,

    alternatePhone: this.profile.alternatePhone,

    bloodGroup: this.profile.bloodGroup,

    bio: this.profile.bio,

    profileImage: this.profile.profileImage,

    familyMembers: this.profile.familyMembers,

    vehicles: this.profile.vehicles

  };

  this.profileService.updateProfile(data).subscribe({

    next: () => {

      alert("Profile Updated Successfully");

      this.isEditMode = false;

      this.loadProfile();

    },

    error: (err) => {

      console.error(err);

      alert("Failed to update profile.");

    }

  });

}
  addFamilyMember(): void {

  this.profile.familyMembers.push({

    name: '',
    relation: '',
    dateOfBirth: ''

  });

}

removeFamilyMember(index: number): void {

  this.profile.familyMembers.splice(index, 1);

}
addVehicle(): void {

  this.profile.vehicles.push({

    vehicleType: '',

    vehicleNumber: '',

    parkingSlot: ''

  });

}

removeVehicle(index: number): void {

  this.profile.vehicles.splice(index, 1);

}

}