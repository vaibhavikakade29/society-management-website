import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';
import { ResidentService } from 'src/app/core/services/resident.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  bill = {
    residentId: '',
    residentName: '',
    flatNo: '',
    billMonth: '',
    billYear: new Date().getFullYear(),
    maintenanceAmount: 0,
    dueDate: '',
    remarks: ''
  };

  bills: any[] = [];
  filteredBills: any[] = [];
  residents: any[] = [];

  searchText = '';

  successMessage = '';
  errorMessage = '';

  selectedBill: any = null;
  editingBill = false;

editBill = {

  _id: '',

  maintenanceAmount: 0,

  dueDate: '',

  remarks: ''

};
  showDeleteModal = false;
  deleteId = '';

  constructor(
    private maintenanceService: MaintenanceService,
    private residentService: ResidentService
  ) { }

  ngOnInit(): void {

    this.loadResidents();

    this.loadBills();

  }

  /**
   * Load Approved Residents
   */
  loadResidents(): void {

    this.residentService.getResidents().subscribe({

      next: (response) => {

        this.residents = (response.residents || []).filter(
          (resident: any) => resident.status === 'approved'
        );

      },

      error: () => {

        this.showError('Unable to load residents.');

      }

    });

  }

  /**
   * Load All Bills
   */
  loadBills(): void {

    this.maintenanceService.getAllBills().subscribe({

      next: (response) => {

       this.bills = response.maintenanceBills || [];

        this.filteredBills = [...this.bills];

      },

      error: () => {

        this.showError('Unable to load maintenance bills.');

      }

    });

  }

  /**
   * Auto Fill Resident Details
   */
  onResidentChange(): void {

    const resident = this.residents.find(

      (r: any) => r._id === this.bill.residentId

    );

    if (resident) {

      this.bill.residentName = resident.fullName;

      this.bill.flatNo = resident.flatNo;

    }

  }
  /**
 * ==========================================
 * Generate Maintenance Bill
 * ==========================================
 */
generateBill(): void {

  if (
    !this.bill.residentId ||
    !this.bill.maintenanceAmount ||
    !this.bill.billMonth ||
    !this.bill.billYear ||
    !this.bill.dueDate
  ) {

    this.showError(
      'Please fill all required fields.'
    );

    return;

  }

  this.maintenanceService.generateBill(
    this.bill
  ).subscribe({

    next: () => {

      this.showSuccess(
        'Maintenance Bill Generated Successfully.'
      );

      this.resetForm();

      this.loadBills();

    },

    error: (error) => {

      console.log(error);

      this.showError(

        error.error?.message ||

        'Unable to generate maintenance bill.'

      );

    }

  });

}
    /**
   * ==========================================
   * View Bill
   * ==========================================
   */
  viewBill(bill: any): void {

    this.selectedBill = bill;

  }

  /**
 * ==========================================
 * Open Edit Bill
 * ==========================================
 */
editMaintenanceBill(bill: any): void {

  this.editingBill = true;

  this.editBill = {

    _id: bill._id,

    maintenanceAmount: bill.maintenanceAmount,

    dueDate: bill.dueDate
      ? new Date(bill.dueDate).toISOString().substring(0, 10)
      : '',

    remarks: bill.remarks || ''

  };

}
  /**
   * ==========================================
   * Close Bill
   * ==========================================
   */
  closeBill(): void {

    this.selectedBill = null;

  }

  /**
   * ==========================================
   * Open Delete Modal
   * ==========================================
   */
  openDeleteModal(id: string): void {

    this.deleteId = id;

    this.showDeleteModal = true;

  }

  /**
   * ==========================================
   * Confirm Delete
   * ==========================================
   */
  confirmDelete(): void {

    this.maintenanceService.deleteBill(

      this.deleteId

    ).subscribe({

      next: () => {

        this.showDeleteModal = false;

        this.deleteId = '';

        this.loadBills();

        this.showSuccess(

          'Maintenance Bill Deleted Successfully.'

        );

      },

      error: (error) => {

        console.log(error);

        this.showError(

          'Unable to delete maintenance bill.'

        );

      }

    });

  }

  /**
 * ==========================================
 * Update Maintenance Bill
 * ==========================================
 */
updateBill(): void {

  this.maintenanceService.updateBill(

    this.editBill._id,

    {

      maintenanceAmount: this.editBill.maintenanceAmount,

      dueDate: this.editBill.dueDate,

      remarks: this.editBill.remarks

    }

  ).subscribe({

    next: (response) => {

      this.showSuccess(response.message);

      this.editingBill = false;

      this.loadBills();

    },

    error: (error) => {

      console.log(error);

      this.showError(

        error.error?.message ||

        'Unable to update bill.'

      );

    }

  });

}
/**
 * ==========================================
 * Close Edit Modal
 * ==========================================
 */
closeEditModal(): void {

  this.editingBill = false;

}
/**
 * ==========================================
 * Approve Resident Payment
 * ==========================================
 */
approvePayment(bill: any): void {

  let request;

  if (bill.status === 'Cash Pending') {

    request = this.maintenanceService.confirmCashPayment(bill._id);

  }

  else {

    request = this.maintenanceService.verifyPayment(bill._id);

  }

  request.subscribe({

    next: (response:any) => {

      this.showSuccess(response.message);

      this.loadBills();

    },

    error: (error) => {

      console.log(error);

      this.showError(

        error.error?.message ||

        'Unable to verify payment.'

      );

    }

  });

}
rejectPayment(bill: any): void {

  this.maintenanceService.rejectPayment(

    bill._id

  ).subscribe({

    next: (response:any) => {

      this.showSuccess(response.message);

      this.loadBills();

    },

    error: (error) => {

      console.log(error);

      this.showError(

        error.error?.message ||

        'Unable to reject payment.'

      );

    }

  });

}  /**
   * ==========================================
   * Cancel Delete
   * ==========================================
   */
  cancelDelete(): void {

    this.showDeleteModal = false;

    this.deleteId = '';

  }

  /**
   * ==========================================
   * Search Bill
   * ==========================================
   */
  searchBill(): void {

    const search = this.searchText.toLowerCase();

    this.filteredBills = this.bills.filter(

      (bill: any) =>

        bill.flatNo.toLowerCase().includes(search) ||

        bill.residentName.toLowerCase().includes(search)

    );

  }

  /**
   * ==========================================
   * Reset Form
   * ==========================================
   */
  resetForm(): void {

    this.bill = {

      residentId: '',

      residentName: '',

      flatNo: '',

      billMonth: '',

      billYear: new Date().getFullYear(),

      maintenanceAmount:0,

      dueDate: '',

      remarks: ''

    };

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
   * Statistics
   * ==========================================
   */
  get totalBills(): number {

    return this.bills.length;

  }

  get paidBills(): number {

    return this.bills.filter(

      (bill: any) =>

        bill.status === 'Paid'

    ).length;

  }
get pendingBills(): number {

  return this.bills.filter(

    (bill: any) =>

      bill.status === 'Pending' ||

      bill.status === 'Payment Verification'

  ).length;

}

  get totalCollection(): number {

    return this.bills

      .filter(

        (bill: any) =>

          bill.status === 'Paid'

      )

      .reduce(

        (sum: number, bill: any) =>

          sum + Number(bill.maintenanceAmount),

        0

      );

  }

}