import { Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { flatMap, startWith, takeUntil } from 'rxjs/operators';
import { NodesItemCorrectInterface } from 'interfaces';
import { JobService } from 'services';
import { StatusService } from 'services';

@Component({
  selector       : 'flink-job-overview-drawer-accumulators',
  templateUrl    : './job-overview-drawer-accumulators.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls      : [ './job-overview-drawer-accumulators.component.less' ]
})
export class JobOverviewDrawerAccumulatorsComponent implements OnInit, OnDestroy {
  @Input() node: NodesItemCorrectInterface;
  destroy$ = new Subject();
  listOfAccumulator = [];
  listOfSubTaskAccumulator = [];
  isLoading = true;

  trackAccumulatorBy(index, node) {
    return node.name;
  }

  constructor(private statusService: StatusService, private jobService: JobService) {
  }

  ngOnInit() {
    this.statusService.refresh$.pipe(
      startWith(true),
      takeUntil(this.destroy$),
      flatMap(() => this.jobService.loadAccumulators(this.jobService.jobDetail.jid, this.node.id))
    ).subscribe(data => {
      this.isLoading = false;
      this.listOfAccumulator = data.main;
      this.listOfSubTaskAccumulator = data.subtasks[ 'user-accumulators' ] || [];
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
