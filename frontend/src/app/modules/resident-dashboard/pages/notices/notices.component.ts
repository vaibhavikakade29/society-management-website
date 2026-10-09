import { Component, OnInit } from '@angular/core';
import { NoticeService } from 'src/app/core/services/notice.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {

  currentUser: any;

  notices: any[] = [];
  filteredNotices: any[] = [];

  selectedNotice: any = null;

  searchText: string = '';

  constructor(
    private noticeService: NoticeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  // =========================
  // LOAD USER
  // =========================
  loadUser(): void {
    this.authService.getCurrentUser().subscribe({
      next: (res: any) => {
        this.currentUser = res.user;
        this.loadNotices();
      },
      error: () => alert('Failed to load user')
    });
  }

  // =========================
  // LOAD NOTICES (FILTERED)
  // =========================
  loadNotices(): void {

    this.noticeService.getAllNotices().subscribe({
      next: (res: any) => {

        const today = new Date();

        this.notices = res.notices.filter((n: any) => {

          // expired remove
          if (new Date(n.expiryDate) < today) return false;

          // visibleTo logic
          if (n.visibleTo === 'all') return true;

          if (
            n.visibleTo === 'owner' &&
            this.currentUser.userType === 'owner'
          ) return true;

          if (
            n.visibleTo === 'tenant' &&
            this.currentUser.userType === 'tenant'
          ) return true;

          if (n.visibleTo === this.currentUser.wing) return true;

          return false;
        });

        this.filteredNotices = [...this.notices];
      },
      error: () => alert('Failed to load notices')
    });
  }

  // =========================
  // SEARCH
  // =========================
  searchNotice(): void {
    const s = this.searchText.toLowerCase();

    this.filteredNotices = this.notices.filter(n =>
      n.title.toLowerCase().includes(s) ||
      n.noticeType.toLowerCase().includes(s)
    );
  }

  // =========================
  // VIEW
  // =========================
  viewNotice(notice: any): void {
    this.selectedNotice = notice;
  }

  closeNotice(): void {
    this.selectedNotice = null;
  }

  // =========================
  // STATS
  // =========================
  get totalNotices(): number {
    return this.notices.length;
  }
}