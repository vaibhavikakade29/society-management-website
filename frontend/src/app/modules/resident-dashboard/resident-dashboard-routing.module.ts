import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NoticesComponent } from './pages/notices/notices.component';
import { ComplaintsComponent } from './pages/complaints/complaints.component';
import { VisitorsComponent } from './pages/visitors/visitors.component';
import { RulesComponent } from './pages/rules/rules.component';
import { EventsComponent } from './pages/events/events.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,

    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },

      {
        path: 'notices',
        component: NoticesComponent
      },

      {
        path: 'complaints',
        component: ComplaintsComponent
      },
      {
        path: 'maintenance',
        component: MaintenanceComponent
      },
      {
        path: 'visitors',
        component: VisitorsComponent
      },

      {
        path:'rules',
        component:RulesComponent
        },

      {
        path: 'events',
        component: EventsComponent
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidentDashboardRoutingModule {
  
 }
