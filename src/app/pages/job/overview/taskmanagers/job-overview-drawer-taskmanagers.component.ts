import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { flatMap, startWith, takeUntil } from 'rxjs/operators';
import { deepFind } from 'core';
import { NodesItemCorrectInterface } from 'interfaces';
import { JobService, StatusService } from 'services';

@Component({
  selector   : 'flink-job-overview-drawer-taskmanagers',
  templateUrl: './job-overview-drawer-taskmanagers.component.html',
  styleUrls  : [ './job-overview-drawer-taskmanagers.component.less' ]
})
export class JobOverviewDrawerTaskmanagersComponent implements OnInit, OnDestroy {
  @Input() node: NodesItemCorrectInterface;
  listOfTaskManager = [];
  destroy$ = new Subject();
  sortName = null;
  sortValue = null;
  isLoading = true;

  trackTaskManagerBy(index, node) {
    return node.host;
  }

  sort(sort: { key: string, value: string }) {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search() {
    if (this.sortName) {
      this.listOfTaskManager = [ ...this.listOfTaskManager.sort(
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
      flatMap(() => this.jobService.loadTaskManagers(this.jobService.jobDetail.jid, this.node.id))
    ).subscribe(data => {
      this.listOfTaskManager = data.taskmanagers;
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
