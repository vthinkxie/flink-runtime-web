import { Component, Input, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { flatMap, startWith, takeUntil } from 'rxjs/operators';
import { deepFind } from 'core';
import { NodesItemCorrectInterface, JobSubTaskInterface } from 'interfaces';
import { JobService, StatusService } from 'services';

@Component({
  selector       : 'flink-job-overview-drawer-subtasks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl    : './job-overview-drawer-subtasks.component.html',
  styleUrls      : [ './job-overview-drawer-subtasks.component.less' ]
})
export class JobOverviewDrawerSubtasksComponent implements OnInit, OnDestroy {
  @Input() node: NodesItemCorrectInterface;
  listOfTask: JobSubTaskInterface[] = [];
  destroy$ = new Subject();
  sortName = null;
  sortValue = null;
  isLoading = true;

  trackTaskBy(index, node) {
    return node.attempt;
  }

  sort(sort: { key: string, value: string }) {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search() {
    if (this.sortName) {
      this.listOfTask = [ ...this.listOfTask.sort(
        (pre, next) => {
          if (this.sortValue === 'ascend') {
            return (deepFind(pre, this.sortName) > deepFind(next, this.sortName) ? 1 : -1);
          } else {
            return (deepFind(next, this.sortName) > deepFind(pre, this.sortName) ? 1 : -1);
          }
        }) ];
    }
  }

  constructor(private statusService: StatusService, private jobService: JobService) {
  }

  ngOnInit() {
    this.statusService.refresh$.pipe(
      startWith(true),
      takeUntil(this.destroy$),
      flatMap(() => this.jobService.loadSubTasks(this.jobService.jobDetail.jid, this.node.id))
    ).subscribe(data => {
      this.listOfTask = data;
      this.isLoading = false;
      this.search();
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
