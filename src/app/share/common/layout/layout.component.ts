import { Component, OnInit } from '@angular/core';
import { StatusService } from 'services';

@Component({
  selector   : 'flink-layout',
  templateUrl: './layout.component.html',
  styleUrls  : [ './layout.component.less' ]
})
export class LayoutComponent implements OnInit {
  constructor(public statusService: StatusService) {
  }

  ngOnInit() {
  }

}
