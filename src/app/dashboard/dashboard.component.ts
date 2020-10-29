import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dropdown = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }

}
