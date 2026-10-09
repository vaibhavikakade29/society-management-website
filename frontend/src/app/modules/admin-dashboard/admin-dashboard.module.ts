import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ResidentsComponent } from './pages/residents/residents.component';
import { NoticesComponent } from './pages/notices/notices.component';
import { ComplaintsComponent } from './pages/complaints/complaints.component';
import { VisitorsComponent } from './pages/visitors/visitors.component';
import { EventsComponent } from './pages/events/events.component';
import { FormsModule } from '@angular/forms';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { RulesComponent } from './pages/rules/rules.component';
@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    ResidentsComponent,
    NoticesComponent,
    ComplaintsComponent,
    VisitorsComponent,
    EventsComponent,
    MaintenanceComponent,
    RulesComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
     FormsModule
  ]
})
export class AdminDashboardModule { }