import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/core/services/complaint.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  /**
   * Complaint Form Model
   */
  complaint = {

    category: '',

    priority: '',

    description: ''

  };

  /**
   * Success Message
   */
  successMessage: string = '';

  /**
   * Error Message
   */
  errorMessage: string = '';

  /**
   * Resident Complaints
   */
  myComplaints: any[] = [];

  constructor(

    private complaintService: ComplaintService,
  ) { }

  ngOnInit(): void {

    this.loadMyComplaints();

  }

  /**
   * Submit Complaint
   */
  submitComplaint(): void {

    if (

      !this.complaint.category ||

      !this.complaint.priority ||

      !this.complaint.description

    ) {

      this.errorMessage = 'Please fill all fields';

      setTimeout(() => {

        this.errorMessage = '';

      }, 3000);

      return;

    }

    this.complaintService.submitComplaint(

      this.complaint

    ).subscribe({

      next: (response) => {
        this.successMessage = response.message;

        this.complaint = {

          category: '',

          priority: '',

          description: ''

        };

        this.loadMyComplaints();

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
   * Load My Complaints
   */
  loadMyComplaints(): void {

    this.complaintService.getMyComplaints().subscribe({

      next: (response) => {

        this.myComplaints = response.complaints;

      },

      error: (error) => {

        console.log(error);

      }

    });

  }

}