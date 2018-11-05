import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { NodesItemCorrectInterface } from 'interfaces';
import { StatusService } from 'services';

@Component({
  selector       : 'flink-job-overview-drawer',
  templateUrl    : './job-overview-drawer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls      : [ './job-overview-drawer.component.less' ]
})
export class JobOverviewDrawerComponent implements OnInit {

  @Input() node: NodesItemCorrectInterface;
  @Output() closeDrawer = new EventEmitter();

  index = 0;

  refresh() {
    this.statusService.manualRefresh();
  }

  constructor(private statusService: StatusService) {
  }

  ngOnInit() {
  }

}
