import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {
  @Input() dropdown: boolean;
  @Output() toggleEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  toggle () {
    this.toggleEvent.next();
  }

}
