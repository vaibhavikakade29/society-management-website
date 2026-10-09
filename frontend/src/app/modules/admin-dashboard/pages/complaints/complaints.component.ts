import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/core/services/complaint.service';
@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  complaints: any[] = [];

  filteredComplaints: any[] = [];

  selectedComplaint: any = null;

  searchText = '';

  successMessage = '';

  errorMessage = '';

  constructor(

    private complaintService: ComplaintService,
  ) { }

  ngOnInit(): void {

    this.loadComplaints();

  }

  /**
   * Load All Complaints
   */
  loadComplaints(): void {

    this.complaintService.getAllComplaints().subscribe({

      next: (response) => {

        this.complaints = response.complaints;

        this.filteredComplaints = [...this.complaints];

      },

      error: (error) => {

        console.log(error);

        this.errorMessage = 'Unable to load complaints.';

        setTimeout(() => {

          this.errorMessage = '';

        }, 3000);

      }

    });

  }

  /**
   * View Complaint
   */
  viewComplaint(complaint: any): void {

    this.selectedComplaint = {

      ...complaint

    };

  }

  /**
   * Close Modal
   */
  closeComplaint(): void {

    this.selectedComplaint = null;

  }

  /**
   * Update Complaint Status
   */
  updateStatus(): void {

    if (!this.selectedComplaint) {

      return;

    }

    this.complaintService.updateStatus(

      this.selectedComplaint._id,

      this.selectedComplaint.status

    ).subscribe({

      next: (response) => {
        this.successMessage = response.message;

        this.loadComplaints();

        setTimeout(() => {

          this.successMessage = '';

        }, 3000);

      },

      error: (error) => {

        console.log(error);

        this.errorMessage = error.error.message;

        setTimeout(() => {

          this.errorMessage = '';

        }, 3000);

      }

    });

  }

  /**
   * Save Admin Remarks
   */
  saveRemarks(): void {

    if (!this.selectedComplaint) {

      return;

    }

    this.complaintService.updateRemarks(

      this.selectedComplaint._id,

      this.selectedComplaint.adminRemarks

    ).subscribe({

      next: (response) => {
        this.successMessage = response.message;

        this.loadComplaints();

        this.closeComplaint();

        setTimeout(() => {

          this.successMessage = '';

        }, 3000);

      },

      error: (error) => {

        console.log(error);

        this.errorMessage = error.error.message;

        setTimeout(() => {

          this.errorMessage = '';

        }, 3000);

      }

    });

  }

  /**
   * Search Complaint
   */
  searchComplaint(): void {

    const search = this.searchText.toLowerCase();

    this.filteredComplaints = this.complaints.filter(

      complaint =>

        complaint.category.toLowerCase().includes(search) ||

        complaint.residentName.toLowerCase().includes(search)

    );

  }

  /**
   * Dashboard Counts
   */
  get totalComplaints(): number {

    return this.complaints.length;

  }

  get pendingComplaints(): number {

    return this.complaints.filter(

      c => c.status === 'Pending'

    ).length;

  }

  get inProgressComplaints(): number {

    return this.complaints.filter(

      c => c.status === 'In Progress'

    ).length;

  }

  get resolvedComplaints(): number {

    return this.complaints.filter(

      c => c.status === 'Resolved'

    ).length;

  }

}