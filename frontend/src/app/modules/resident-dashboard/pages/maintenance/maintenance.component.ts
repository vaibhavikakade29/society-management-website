import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  bills: any[] = [];

  successMessage = '';
  errorMessage = '';

  selectedBill: any = null;

  paymentMode = 'UPI';

  transactionId = '';

  constructor(
    private maintenanceService: MaintenanceService
  ) { }

  ngOnInit(): void {

    this.loadBills();

  }

  /**
   * ==========================================
   * Load Resident Bills
   * ==========================================
   */

  loadBills(): void {

    this.maintenanceService.getMyBills().subscribe({

      next: (response) => {

       this.bills = response.maintenanceBills || [];

      },

      error: (error) => {

        console.log(error);

        this.showError(

          'Unable to load maintenance bills.'

        );

      }

    });

  }

  /**
   * ==========================================
   * Open Payment Popup
   * ==========================================
   */

 openPayment(bill: any): void {

  this.selectedBill = bill;

  this.paymentMode = 'UPI';

  this.transactionId = '';

  this.successMessage = '';

  this.errorMessage = '';

}

  /**
   * ==========================================
   * Close Payment Popup
   * ==========================================
   */

 cancelPayment(): void {

  this.selectedBill = null;

  this.transactionId = '';

  this.paymentMode = 'UPI';

}

  /**
   * ==========================================
   * Submit Payment
   * ==========================================
   */

 payBill(): void {

  if (!this.selectedBill) {

    return;

  }

  // Cash Request
  if (this.paymentMode === 'Cash') {

    this.maintenanceService.payBill(

      this.selectedBill._id,

      {

        paymentMode: 'Cash',

        transactionId: ''

      }

    ).subscribe({

      next: (response) => {

        this.successMessage = response.message;

        this.selectedBill = null;

        this.loadBills();

        setTimeout(() => {

          this.successMessage = '';

        }, 3000);

      },

      error: (error) => {

        console.log(error);

        this.errorMessage =

          error.error?.message ||

          'Unable to submit cash request.';

      }

    });

    return;

  }

  // UPI / Net Banking
  if (!this.transactionId.trim()) {

    this.errorMessage =

      'Please enter Transaction ID';

    return;

  }

  this.maintenanceService.payBill(

    this.selectedBill._id,

    {

      paymentMode: this.paymentMode,

      transactionId: this.transactionId

    }

  ).subscribe({

    next: (response) => {

      this.successMessage = response.message;

      this.selectedBill = null;

      this.loadBills();

      setTimeout(() => {

        this.successMessage = '';

      }, 3000);

    },

    error: (error) => {

      console.log(error);

      this.errorMessage =

        error.error?.message ||

        'Payment Failed';

    }

 });

}
  /**
   * ==========================================
   * Success Message
   * ==========================================
   */

  showSuccess(message: string): void {

    this.successMessage = message;

    this.errorMessage = '';

    setTimeout(() => {

      this.successMessage = '';

    }, 3000);

  }

  /**
   * ==========================================
   * Error Message
   * ==========================================
   */

  showError(message: string): void {

    this.errorMessage = message;

    this.successMessage = '';

    setTimeout(() => {

      this.errorMessage = '';

    }, 3000);

  }

  /**
   * ==========================================
   * Dashboard Statistics
   * ==========================================
   */

  get totalBills(): number {

    return this.bills.length;

  }

  get paidBills(): number {

    return this.bills.filter(

      bill => bill.status === 'Paid'

    ).length;

  }

 get pendingBills(): number {

  return this.bills.filter(

    b =>

      b.status === 'Pending' ||

      b.status === 'Payment Verification' ||

      b.status === 'Cash Pending'

  ).length;

}
get cashPendingBills(): number {

  return this.bills.filter(

    b => b.status === 'Cash Pending'

  ).length;

}
}