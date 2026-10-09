import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { AmenitiesComponent } from './components/amenities/amenities.component';
import { ContactComponent } from './components/contact/contact.component';
import { CommunityLifeComponent } from './components/community-life/community-life.component';

const routes: Routes = [

  {
    path: '',
    component: PublicLayoutComponent,

    children: [

      {
        path: '',
        component: HomeComponent
      },

      {
        path: 'about',
        component: AboutComponent
      },

      {
        path: 'amenities',
        component: AmenitiesComponent
      },

      {
        path: 'community-life',
        component: CommunityLifeComponent
      },

      {
        path: 'contact',
        component: ContactComponent
      }
    ],
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicSiteRoutingModule {}