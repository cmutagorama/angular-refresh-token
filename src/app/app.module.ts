import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { AuthService } from './_services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { appInitializer } from './_helpers/app.initializer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
