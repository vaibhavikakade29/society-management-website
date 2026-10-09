import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ResidentService } from 'src/app/core/services/resident.service';
@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.css']
})
export class ResidentsComponent implements OnInit {

  residents: any[] = [];
  filteredResidents: any[] = [];

  selectedResident: any = null;

  totalResidents = 0;
  approvedResidents = 0;
  pendingResidents = 0;
  ownersCount = 0;
  tenantsCount = 0;

  searchText = '';
  selectedWing = '';
  selectedStatus = '';
  selectedUserType = '';

  constructor(
  private notificationService: NotificationService,
  private residentService: ResidentService
) {}

  ngOnInit(): void {
    this.loadResidents();
  }

loadResidents(): void {

  this.residentService.getResidents().subscribe({

    next: (response) => {

      this.residents = response.residents || [];

      this.filteredResidents = [...this.residents];

      this.calculateStatistics();

    },

    error: (error) => {

      console.error(error);

      alert(error.error?.message || 'Unable to load residents.');

    }

  });

}
 calculateStatistics(): void {

  this.totalResidents = this.residents.length;

  this.approvedResidents =
    this.residents.filter(r => r.status === 'approved').length;

  this.pendingResidents =
    this.residents.filter(r => r.status === 'pending').length;

  this.ownersCount =
    this.residents.filter(r => r.userType === 'owner').length;

  this.tenantsCount =
    this.residents.filter(r => r.userType === 'tenant').length;

}
  applyFilters(): void {
    this.filteredResidents = this.residents.filter(user => {

      const searchMatch =
        user.fullName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.email?.toLowerCase().includes(this.searchText.toLowerCase()) ||
       user.flatNo?.toString().toLowerCase().includes(this.searchText.toLowerCase());

      const wingMatch = !this.selectedWing || user.wing === this.selectedWing;
      const statusMatch = !this.selectedStatus || user.status === this.selectedStatus;
      const typeMatch = !this.selectedUserType || user.userType === this.selectedUserType;

      return searchMatch && wingMatch && statusMatch && typeMatch;
    });
  }

  /**
   * APPROVE USER (UPDATED)
   */
 approveUser(id: string): void {

  if (!confirm('Approve this resident?')) {
    return;
  }

  this.residentService.approveResident(id).subscribe({

    next: (response) => {

      alert(response.message);

      this.loadResidents();

    },

    error: (error) => {

      alert(error.error?.message || 'Unable to approve resident.');

    }

  });

}

  /**
   * REJECT USER (UPDATED)
   */
 rejectUser(id: string): void {

  if (!confirm('Reject this resident?')) {
    return;
  }

  this.residentService.rejectResident(id).subscribe({

    next: (response) => {

      alert(response.message);

      this.loadResidents();

    },

    error: (error) => {

      alert(error.error?.message || 'Unable to reject resident.');

    }

  });

}
  viewResident(user: any): void {
    this.selectedResident = user;
  }

  closeDetails(): void {
    this.selectedResident = null;
  }
}