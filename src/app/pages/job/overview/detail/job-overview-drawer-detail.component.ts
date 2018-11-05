import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NodesItemCorrectInterface } from 'interfaces';

@Component({
  selector       : 'flink-job-overview-drawer-detail',
  templateUrl    : './job-overview-drawer-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls      : [ './job-overview-drawer-detail.component.less' ]
})
export class JobOverviewDrawerDetailComponent implements OnInit {
  @Input() node: NodesItemCorrectInterface;

  constructor() {
  }

  ngOnInit() {
  }
}
