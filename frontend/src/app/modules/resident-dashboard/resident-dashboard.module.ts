import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResidentDashboardRoutingModule } from './resident-dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NoticesComponent } from './pages/notices/notices.component';
import { ComplaintsComponent } from './pages/complaints/complaints.component';
import { VisitorsComponent } from './pages/visitors/visitors.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { EventsComponent } from './pages/events/events.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RulesComponent } from './pages/rules/rules.component';

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    ProfileComponent,
    NoticesComponent,
    ComplaintsComponent,
    VisitorsComponent,
    MaintenanceComponent,
    EventsComponent,
    RulesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ResidentDashboardRoutingModule
  ]
})
export class ResidentDashboardModule { }
