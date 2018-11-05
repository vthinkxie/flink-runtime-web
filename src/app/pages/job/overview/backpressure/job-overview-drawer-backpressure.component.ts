import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { flatMap, startWith, takeUntil } from 'rxjs/operators';
import { JobBackpressureInterface, NodesItemCorrectInterface } from 'interfaces';
import { JobService, StatusService } from 'services';

@Component({
  selector       : 'flink-job-overview-drawer-backpressure',
  templateUrl    : './job-overview-drawer-backpressure.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls      : [ './job-overview-drawer-backpressure.component.less' ]
})
export class JobOverviewDrawerBackpressureComponent implements OnInit, OnDestroy {
  @Input() node: NodesItemCorrectInterface;
  destroy$ = new Subject();
  isLoading = true;
  now = Date.now();
  backpressure = {} as JobBackpressureInterface;
  listOfSubTaskBackpressure = [];

  labelState(state) {
    switch (state && state.toLowerCase()) {
      case 'in-progress':
        return 'danger';
      case 'ok':
        return 'success';
      case 'low':
        return 'warning';
      case 'high':
        return 'danger';
      default:
        return 'default';
    }
  }

  constructor(private statusService: StatusService, private jobService: JobService) {
  }

  ngOnInit() {
    this.statusService.refresh$.pipe(
      startWith(true),
      takeUntil(this.destroy$),
      flatMap(() => this.jobService.loadOperatorBackPressure(this.jobService.jobDetail.jid, this.node.id))
    ).subscribe(data => {
      this.isLoading = false;
      this.now = Date.now();
      this.backpressure = data;
      this.listOfSubTaskBackpressure = data[ 'subtasks' ] || [];
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
