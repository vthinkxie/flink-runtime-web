import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { flatMap, takeUntil } from 'rxjs/operators';
import { JobService, StatusService } from 'services';

@Component({
  selector   : 'flink-job',
  templateUrl: './job.component.html',
  styleUrls  : [ './job.component.less' ]
})
export class JobComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  isLoading = true;

  constructor(private activatedRoute: ActivatedRoute, private jobService: JobService, private statusService: StatusService) {
  }

  ngOnInit() {
    Promise.resolve().then(() => this.statusService.isCollapsed = true);
    this.statusService.refresh$.pipe(
      takeUntil(this.destroy$),
      flatMap(() => this.jobService.loadJob(this.activatedRoute.snapshot.params.jid))
    ).subscribe(data => {
      this.jobService.jobDetail = data;
      this.jobService.jobDetail$.next(data);
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.jobService.jobDetail = null;
  }

}
