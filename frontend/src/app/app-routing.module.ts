import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public-site/pages/home/home.component';
import { ResidentsComponent } from './modules/admin-dashboard/pages/residents/residents.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { ResidentGuard } from './core/guards/resident.guard';
import { LogoutMessageComponent } from './shared/logout-message/logout-message.component';
const routes: Routes = [

  //default redirect to homepage
  {
  path: '',
  loadChildren: () =>
    import('./public-site/public-site.module')
      .then(m => m.PublicSiteModule)
},
  // Auth Pages redirect using lazyloading
  {
  path: 'auth',
  loadChildren: () =>
    import('./modules/auth/auth.module')
      .then(m => m.AuthModule)
  },
  //admin dashboard redirect using lazyloading
  {
    path: 'admin-dashboard',

    canActivate: [
      AuthGuard,
      AdminGuard
    ],

    canActivateChild: [
      AuthGuard,
      AdminGuard
    ],

    loadChildren: () =>
      import('./modules/admin-dashboard/admin-dashboard.module')
        .then(m => m.AdminDashboardModule)
  },
  //resident dashboard redirect using lazyloading
  {
    path: 'resident-dashboard',

    canActivate: [
      AuthGuard,
      ResidentGuard
    ],

    canActivateChild: [
      AuthGuard,
      ResidentGuard
    ],

    loadChildren: () =>
      import('./modules/resident-dashboard/resident-dashboard.module')
        .then(m => m.ResidentDashboardModule)
  },
  {
    path: 'logout',
    component: LogoutMessageComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}