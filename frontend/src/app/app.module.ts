import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { PublicSiteModule } from './public-site/public-site.module';
import { PreloaderComponent } from './shared/preloader/preloader.component';
import { PageLoaderComponent } from './shared/page-loader/page-loader.component';
import { LogoutMessageComponent } from './shared/logout-message/logout-message.component';
import { ToastComponent } from './shared/toast/toast.component';
import { AiAssistantComponent } from './shared/ai-assistant/ai-assistant.component';
@NgModule({

  declarations: [
    AppComponent,
    PreloaderComponent,
    PageLoaderComponent,
    LogoutMessageComponent,
    ToastComponent,
    AiAssistantComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicSiteModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgChartsModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}