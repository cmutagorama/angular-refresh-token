import { User } from './../_models/user';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe(x => this.user = x);
   }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
