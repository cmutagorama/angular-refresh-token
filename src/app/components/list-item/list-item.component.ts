import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() class: any;
  @Input() svgIcon: any;
  @Input() title: any;
  @Input() description: any;

  constructor() { }

  ngOnInit(): void {
  }

}
