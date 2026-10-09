import { Component, OnInit } from '@angular/core';

import { VisitorService } from 'src/app/core/services/visitor.service';
import { ComplaintService } from 'src/app/core/services/complaint.service';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';
import { NoticeService } from 'src/app/core/services/notice.service';
import { EventService } from 'src/app/core/services/event.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: any = {};

  visitors: any[] = [];
  complaints: any[] = [];
  maintenanceBills: any[] = [];
  notices: any[] = [];
  events: any[] = [];
  notifications: any[] = [];

  visitorCount = 0;
  complaintCount = 0;
  pendingBills = 0;
  upcomingEvents = 0;

  constructor(
    private visitorService: VisitorService,
    private complaintService: ComplaintService,
    private maintenanceService: MaintenanceService,
    private noticeService: NoticeService,
    private eventService: EventService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {

    this.currentUser = JSON.parse(
      sessionStorage.getItem('currentUser') || '{}'
    );

    this.loadVisitors();

    this.loadComplaints();

    this.loadMaintenance();

    this.loadNotices();

    this.loadEvents();

    this.loadNotifications();

  }

  loadVisitors(): void {

    this.visitorService.getMyVisitors().subscribe({

      next: (response: any) => {

        this.visitors = response.visitors || [];

        this.visitorCount =
          this.visitors.filter(
            (v: any) => v.status === 'Pending'
          ).length;

      }

    });

  }

  loadComplaints(): void {

    this.complaintService.getMyComplaints().subscribe({

      next: (response: any) => {

        this.complaints = response.complaints || [];

        this.complaintCount = this.complaints.length;

      }

    });

  }

  loadMaintenance(): void {

    this.maintenanceService.getMyBills().subscribe({

      next: (response: any) => {

        this.maintenanceBills =
          response.maintenanceBills || [];

        this.pendingBills =
          this.maintenanceBills.filter(
            (bill: any) => bill.status !== 'Paid'
          ).length;

      }

    });

  }

  loadNotices(): void {

    this.noticeService.getAllNotices().subscribe({

      next: (response: any) => {

        this.notices =
          (response.notices || []).slice(0, 5);

      }

    });

  }

  loadEvents(): void {

    this.eventService.getAllEvents().subscribe({

      next: (response: any) => {

        this.events =
          response.events || [];

        this.upcomingEvents = this.events.length;

      }

    });

  }

  loadNotifications(): void {

    this.notificationService
      .getResidentNotifications()
      .subscribe({

        next: (response: any) => {

          this.notifications =
            (response.notifications || []).slice(0, 5);

        }

      });

  }

}