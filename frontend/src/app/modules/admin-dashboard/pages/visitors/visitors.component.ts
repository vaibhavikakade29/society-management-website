import { Component, OnInit } from '@angular/core';
import { VisitorService } from 'src/app/core/services/visitor.service';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit {

  // ==============================
  // Visitor Data
  // ==============================

  visitors: any[] = [];
  filteredVisitors: any[] = [];

  // ==============================
  // Search & Filter
  // ==============================

  searchText: string = '';
  selectedStatus: string = 'All';

  // ==============================
  // UI States
  // ==============================

  isLoading = false;
  errorMessage = '';

  constructor(
    private visitorService: VisitorService
  ) { }

  ngOnInit(): void {

    this.loadVisitors();

  }

  /**
   * ==============================
   * Load All Visitors
   * ==============================
   */

 loadVisitors(): void {

  this.isLoading = true;

  this.visitorService.getAllVisitors().subscribe({

    next: (response: any) => {

      console.log("Visitor API:", response);

      this.visitors = response?.visitors ?? [];
      this.filteredVisitors = [...this.visitors];

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
   * ==============================
   * Search & Filter
   * ==============================
   */

filterVisitors(): void {

  const search = this.searchText?.toLowerCase() || '';

  this.filteredVisitors = this.visitors.filter((visitor) => {

    const name = visitor.visitorName?.toLowerCase() || '';
    const purpose = visitor.purpose?.toLowerCase() || '';
    const flat = visitor.resident?.flatNo?.toLowerCase() || '';

    const matchesSearch =
      name.includes(search) ||
      purpose.includes(search) ||
      flat.includes(search);

    const matchesStatus =
      this.selectedStatus === 'All' ||
      visitor.status === this.selectedStatus;

    return matchesSearch && matchesStatus;
  });
}
  /**
   * ==============================
   * Approve Visitor
   * ==============================
   */

 approveVisitor(id: string): void {

  if (!confirm("Approve this visitor?")) return;

  this.visitorService.approveVisitor(id).subscribe({
    next: () => this.loadVisitors(),
    error: (error) => alert(error.error?.message || "Error approving visitor")
  });

}
  /**
   * ==============================
   * Reject Visitor
   * ==============================
   */

 rejectVisitor(id: string): void {

  if (!confirm("Reject this visitor?")) return;

  this.visitorService.rejectVisitor(id).subscribe({
    next: () => this.loadVisitors(),
    error: (error) => alert(error.error?.message || "Error rejecting visitor")
  });

}
  /**
   * ==============================
   * Mark Entry
   * ==============================
   */

 markEntry(id: string): void {

  if (!confirm("Mark visitor entry?")) return;

  this.visitorService.markVisitorEntry(id).subscribe({
    next: () => this.loadVisitors(),
    error: (error) => alert(error.error?.message || "Error marking entry")
  });

}
  /**
   * ==============================
   * Mark Exit
   * ==============================
   */

 markExit(id: string): void {

  if (!confirm("Mark visitor exit?")) return;

  this.visitorService.markVisitorExit(id).subscribe({
    next: () => this.loadVisitors(),
    error: (error) => alert(error.error?.message || "Error marking exit")
  });

} /**
   * ==============================
   * Status Badge
   * ==============================
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

}