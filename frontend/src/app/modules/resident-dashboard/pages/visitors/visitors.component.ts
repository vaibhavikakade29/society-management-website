import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisitorService } from 'src/app/core/services/visitor.service';
@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit {

  // ==========================
  // Visitor Form
  // ==========================
  visitorForm!: FormGroup;

  // ==========================
  // Data
  // ==========================
  visitors: any[] = [];

  // ==========================
  // UI States
  // ==========================
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private visitorService: VisitorService
  ) { }

  ngOnInit(): void {

    this.initializeForm();

    this.loadMyVisitors();

  }

  /**
   * ==========================
   * Initialize Form
   * ==========================
   */
  initializeForm(): void {

    this.visitorForm = this.fb.group({

      visitorName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[6-9]\d{9}$/)
        ]
      ],

      purpose: [
        '',
        Validators.required
      ],

      visitDate: [
        '',
        Validators.required
      ],

      expectedTime: [
        '',
        Validators.required
      ],
      expectedPeriod: [
          'AM',
          Validators.required
        ],
      numberOfVisitors: [
        1,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      vehicleNumber: [''],

      idProofType: [''],

      idProofNumber: [''],

      remarks: ['']

    });

  }

  /**
   * ==========================
   * Load My Visitors
   * ==========================
   */
  loadMyVisitors(): void {

    this.isLoading = true;

    this.visitorService.getMyVisitors().subscribe({

      next: (response) => {

        this.visitors = response.visitors || [];

        this.isLoading = false;

      },

      error: (error) => {

        console.error(error);

        this.errorMessage = "Unable to load visitors.";

        this.isLoading = false;

      }

    });

  }

  /**
   * ==========================
   * Submit Visitor Request
   * ==========================
   */
  submitVisitor(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (this.visitorForm.invalid) {

      this.visitorForm.markAllAsTouched();

      return;

    }

    this.isSubmitting = true;

    this.visitorService
      .addVisitor(this.visitorForm.value)
      .subscribe({

        next: (response) => {

          this.successMessage = response.message;

          this.visitorForm.reset();

          this.visitorForm.patchValue({
            numberOfVisitors: 1
          });

          this.loadMyVisitors();

          this.isSubmitting = false;

        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            error.error?.message || "Unable to submit visitor request.";

          this.isSubmitting = false;

        }

      });

  }

  /**
   * ==========================
   * Cancel Visitor
   * ==========================
   */
  cancelVisitor(visitorId: string): void {

    const confirmCancel = confirm(
      "Are you sure you want to cancel this visitor request?"
    );

    if (!confirmCancel) {

      return;

    }

    this.visitorService
      .cancelVisitor(visitorId)
      .subscribe({

        next: (response) => {

          alert(response.message);

          this.loadMyVisitors();

        },

        error: (error) => {

          console.error(error);

          alert(
            error.error?.message ||
            "Unable to cancel visitor request."
          );

        }

      });

  }

  /**
   * ==========================
   * Status Badge Class
   * ==========================
   */
  getStatusClass(status: string): string {

    switch (status) {

      case 'Pending':
        return 'badge-warning';

      case 'Approved':
        return 'badge-success';

      case 'Rejected':
        return 'badge-danger';

      case 'Entered':
        return 'badge-primary';

      case 'Exited':
        return 'badge-secondary';

      case 'Cancelled':
        return 'badge-dark';

      default:
        return '';

    }

  }

  /**
   * ==========================
   * Get Form Controls
   * ==========================
   */
  get f() {

    return this.visitorForm.controls;

  }

}