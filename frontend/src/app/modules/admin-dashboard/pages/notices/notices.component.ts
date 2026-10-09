import { Component, OnInit } from '@angular/core';
import { NoticeService } from 'src/app/core/services/notice.service';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {

  notice: any = {
    title: '',
    description: '',
    noticeType: '',
    visibleTo: '',
    priority: '',
    isPinned: false,
    expiryDate: ''
  };

  notices: any[] = [];
  filteredNotices: any[] = [];

  selectedNotice: any = null;

  searchText: string = '';
  isEditMode: boolean = false;

  successMessage: string = '';
  errorMessage: string = '';

  showDeleteModal: boolean = false;
  deleteNoticeId: string = '';

  constructor(
    private noticeService: NoticeService,
  ) {}

  ngOnInit(): void {
    this.loadNotices();
  }

  // =========================
  // LOAD NOTICES
  // =========================
  loadNotices(): void {
  this.noticeService.getAllNotices().subscribe({
    next: (response) => {

      console.log("NOTICES:", response.notices);

      this.notices = response.notices || [];
      this.filteredNotices = [...this.notices];

    },
    error: (error) => {
      console.log(error);
    }
  });
}
  // =========================
  // CREATE NOTICE
  // =========================
  publishNotice(): void {

    if (
      !this.notice.title ||
      !this.notice.description ||
      !this.notice.noticeType ||
      !this.notice.visibleTo ||
      !this.notice.priority ||
      !this.notice.expiryDate
    ) {
      this.showError('Please fill all fields');
      return;
    }

    this.noticeService.createNotice(this.notice).subscribe({
      next: (res: any) => {
        this.loadNotices();
        this.resetForm();
        this.showSuccess(res.message);
      },
      error: (err) => {
        this.showError(err.error?.message || 'Failed to create notice');
      }
    });
  }

  // =========================
  // EDIT NOTICE
  // =========================
  editNotice(notice: any): void {
    this.notice = { ...notice };
    this.isEditMode = true;
  }

  updateNotice(): void {
    this.noticeService.updateNotice(this.notice._id, this.notice).subscribe({
      next: (res: any) => {
        this.loadNotices();
        this.resetForm();
        this.showSuccess(res.message);
      },
      error: () => this.showError('Update failed')
    });
  }

  // =========================
  // DELETE NOTICE
  // =========================
  openDeleteModal(id: string): void {
    this.deleteNoticeId = id;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.deleteNoticeId = '';
  }

  confirmDelete(): void {
    this.noticeService.deleteNotice(this.deleteNoticeId).subscribe({
      next: (res: any) => {
        this.loadNotices();
        this.showDeleteModal = false;
        this.deleteNoticeId = '';
        this.showSuccess(res.message);
      },
      error: () => this.showError('Delete failed')
    });
  }

  // =========================
  // VIEW NOTICE
  // =========================
  viewNotice(notice: any): void {
    this.selectedNotice = notice;
  }

  closeNotice(): void {
    this.selectedNotice = null;
  }

  // =========================
  // SEARCH
  // =========================
  searchNotice(): void {
    const search = this.searchText.toLowerCase();

    this.filteredNotices = this.notices.filter(n =>
      n.title.toLowerCase().includes(search) ||
      n.noticeType.toLowerCase().includes(search)
    );
  }

  // =========================
  // STATUS
  // =========================
  getStatus(date: string): string {
    return new Date(date) >= new Date() ? 'Active' : 'Expired';
  }

  // =========================
  // RESET
  // =========================
  resetForm(): void {
    this.notice = {
      title: '',
      description: '',
      noticeType: '',
      visibleTo: '',
      priority: '',
      isPinned: false,
      expiryDate: ''
    };
    this.isEditMode = false;
  }

  // =========================
  // MESSAGES
  // =========================
  showSuccess(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = '', 3000);
  }

  showError(msg: string): void {
    this.errorMessage = msg;
    setTimeout(() => this.errorMessage = '', 3000);
  }

  // =========================
  // STATS
  // =========================
  get totalNotices(): number {
    return this.notices.length;
  }

  get activeNotices(): number {
    return this.notices.filter(n =>
      this.getStatus(n.expiryDate) === 'Active'
    ).length;
  }

  get expiredNotices(): number {
    return this.notices.filter(n =>
      this.getStatus(n.expiryDate) === 'Expired'
    ).length;
  }
}