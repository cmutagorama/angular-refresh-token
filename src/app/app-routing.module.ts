import { AuthGuard } from './_helpers/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
