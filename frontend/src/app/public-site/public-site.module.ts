import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicSiteRoutingModule } from './public-site-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { AmenitiesComponent } from './components/amenities/amenities.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommunityLifeComponent } from './components/community-life/community-life.component';
@NgModule({
  declarations: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    AmenitiesComponent,
    ContactComponent,
    FooterComponent,
    HomeComponent,
    PublicLayoutComponent,
    CommunityLifeComponent
  ],
  imports: [
    CommonModule,
    PublicSiteRoutingModule,
    MatFormFieldModule ,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class PublicSiteModule {}