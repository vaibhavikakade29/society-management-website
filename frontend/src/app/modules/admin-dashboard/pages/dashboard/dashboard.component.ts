import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ResidentService } from 'src/app/core/services/resident.service';
import { ComplaintService } from 'src/app/core/services/complaint.service';
import { NoticeService } from 'src/app/core/services/notice.service';
import { VisitorService } from 'src/app/core/services/visitor.service';
import { EventService } from 'src/app/core/services/event.service';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';
import {Chart,registerables} from 'chart.js';
import {AfterViewInit} from '@angular/core';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {
// Cards
totalResidents = 0;
occupiedFlats = 304;

complaints = 0;
visitors = 0;
notices = 0;

pendingBills = 0;

// Lists
latestNotices: any[] = [];
recentComplaints: any[] = [];
recentVisitors: any[] = [];
upcomingEvents: any[] = [];

// Chart Data (Next Step)
pendingComplaints = 0;
resolvedComplaints = 0;

approvedVisitors = 0;
pendingVisitors = 0;
rejectedVisitors = 0;

    visitorRequestMessage = '';
  constructor(
  private residentService: ResidentService,
  private complaintService: ComplaintService,
  private noticeService: NoticeService,
  private visitorService: VisitorService,
  private eventService: EventService,
  private maintenanceService: MaintenanceService
) {}
ngAfterViewInit():void{
this.loadResidentChart();
this.loadComplaintChart();
}
  ngOnInit(): void {

  this.loadDashboard();

}

  loadDashboard(): void {

  forkJoin({

    residents: this.residentService.getResidents(),

    complaints: this.complaintService.getAllComplaints(),

    notices: this.noticeService.getAllNotices(),

    visitors: this.visitorService.getAllVisitors(),

    maintenance: this.maintenanceService.getAllBills(),

    events: this.eventService.getAllEvents()

  }).subscribe({

    next: (response: any) => {

      //----------------------------------
      // Residents
      //----------------------------------

      const residents = response.residents.residents || [];

      this.totalResidents = residents.length;

      //----------------------------------
      // Complaints
      //----------------------------------

      const complaints = response.complaints.complaints || [];

      this.complaints = complaints.length;

      this.pendingComplaints =
        complaints.filter((x: any) =>
          x.status !== 'Resolved'
        ).length;

      this.resolvedComplaints =
        complaints.filter((x: any) =>
          x.status === 'Resolved'
        ).length;

      this.recentComplaints =
        complaints
          .slice(0, 5);

      //----------------------------------
      // Notices
      //----------------------------------

      const notices = response.notices.notices || [];

      this.notices = notices.length;

      this.latestNotices =
        notices.slice(0, 5);

      //----------------------------------
      // Visitors
      //----------------------------------

      const visitors = response.visitors.visitors || [];

      this.visitors = visitors.length;

      this.pendingVisitors =
        visitors.filter((v: any) =>
          v.status === 'Pending'
        ).length;

      this.approvedVisitors =
        visitors.filter((v: any) =>
          v.status === 'Approved'
        ).length;

      this.rejectedVisitors =
        visitors.filter((v: any) =>
          v.status === 'Rejected'
        ).length;

      this.recentVisitors =
        visitors.slice(0, 5);

      //----------------------------------
      // Maintenance
      //----------------------------------

      const bills =
        response.maintenance.maintenanceBills || [];

      this.pendingBills =
        bills
          .filter((bill: any) =>
            bill.status === 'Pending'
          )
          .reduce(

            (sum: number, bill: any) =>

              sum + Number(bill.maintenanceAmount),

            0

          );

      //----------------------------------
      // Events
      //----------------------------------

      const events =
        response.events.events || [];

      this.upcomingEvents =
        events.slice(0, 5);

    },

    error: (error) => {

      console.log(error);

    }

  });

}
  
    loadResidentChart(){

        new Chart("residentChart",{

        type:"bar",

        data:{

        labels:["Jan","Feb","Mar","Apr","May","Jun"],

        datasets:[{

        label:"Residents",

        data:[15,22,18,30,26,35],

        backgroundColor:"#2563eb",

        borderRadius:8

        }]

        },

        options:{

        responsive:true,

        plugins:{

        legend:{display:false}

        },

        scales:{

        y:{beginAtZero:true}

        }

        }

        });

        }
        loadComplaintChart(){

        new Chart("complaintChart",{

        type:"doughnut",

        data:{

        labels:["Resolved","Pending"],

        datasets:[{

        data:[70,30],

        backgroundColor:["#10b981","#ef4444"]

        }]

        },

        options:{

        responsive:true,

        plugins:{

        legend:{

        position:"bottom"

        }

        },

        cutout:"70%"

        }

        });

        }
        createResidentChart(): void {

        new Chart("residentChart",{

        type:"bar",

        data:{
        labels:["Jan","Feb","Mar","Apr","May","Jun"],
        datasets:[{
        label:"Residents",
        data:[12,18,25,20,31,38],
        backgroundColor:"#2563eb",
        borderRadius:8
        }]
        },

        options:{
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
        legend:{
        display:false
        }
        },
        scales:{
        y:{
        beginAtZero:true
        },
        x:{
        grid:{
        display:false
        }
        }
        }
        }

        });

    
      }
      createComplaintChart(): void {

new Chart("complaintChart",{

type:"doughnut",

data:{
labels:["Resolved","Pending"],
datasets:[{
data:[18,7],
backgroundColor:[
"#22c55e",
"#ef4444"
],
borderWidth:0
}]
},

options:{
responsive:true,
maintainAspectRatio:false,
plugins:{
legend:{
position:"bottom"
}
},
cutout:"70%"
}

});

}
}