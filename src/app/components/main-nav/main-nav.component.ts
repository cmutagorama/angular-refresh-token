import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  menu = false;
  @Input() user: any;
  @Output() logoutEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    this.logoutEvent.next();
  }
}
