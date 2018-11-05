import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { deepFind } from 'core';
import { Subject } from 'rxjs';
import { flatMap, takeUntil } from 'rxjs/operators';
import { JobService, StatusService } from 'services';
import { isNil } from 'lodash';

@Component({
  selector   : 'flink-job-list',
  templateUrl: './job-list.component.html',
  styleUrls  : [ './job-list.component.less' ]
})
export class JobListComponent implements OnInit, OnDestroy {
  listOfJob = [];
  isLoading = true;
  destroy$ = new Subject();
  sortName = 'start-time';
  sortValue = 'descend';
  @Input() completed = false;
  @Input() title: string;
  @Input() jobData$;

  sort(sort: { key: string, value: string }) {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search() {
    if (this.sortName) {
      this.listOfJob = [ ...this.listOfJob.sort(
        (pre, next) => {
          if (this.sortValue === 'ascend') {
            return (deepFind(pre, this.sortName) > deepFind(next, this.sortName) ? 1 : -1);
          } else {
            return (deepFind(next, this.sortName) > deepFind(pre, this.sortName) ? 1 : -1);
          }
        }) ];
    }
  }


  trackJobBy(index, node) {
    return node.jid;
  }

  navigateToJob(jid) {
    this.router.navigate([ 'job', jid ]).then();
  }

  constructor(
    private statusService: StatusService,
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.data) {
      this.completed = isNil(this.activatedRoute.snapshot.data.completed) ? this.completed : this.activatedRoute.snapshot.data.completed;
      this.title = isNil(this.activatedRoute.snapshot.data.title) ? this.title : this.activatedRoute.snapshot.data.title;
    }
    this.jobData$ = this.jobData$ || this.statusService.refresh$.pipe(
      takeUntil(this.destroy$),
      flatMap(() => this.jobService.loadJobs())
    );
    this.jobData$.subscribe(data => {
      this.isLoading = false;
      this.listOfJob = data.filter(item => item.completed === this.completed);
      this.search();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
