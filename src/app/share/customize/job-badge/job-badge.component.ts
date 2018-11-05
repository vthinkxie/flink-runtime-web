import { Component, Input, OnInit } from '@angular/core';
import { COLOR_MAP } from '../../../app.config';

@Component({
  selector   : 'flink-job-badge',
  templateUrl: './job-badge.component.html',
  styleUrls  : [ './job-badge.component.less' ]
})
export class JobBadgeComponent implements OnInit {
  @Input() state: string;

  get colorMap() {
    return COLOR_MAP;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
