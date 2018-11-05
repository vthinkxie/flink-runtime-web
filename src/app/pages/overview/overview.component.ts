import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { flatMap, share, takeUntil } from 'rxjs/operators';
import { JobService, StatusService } from 'services';

@Component({
  selector   : 'flink-overview',
  templateUrl: './overview.component.html',
  styleUrls  : [ './overview.component.less' ]
})
export class OverviewComponent implements OnInit, OnDestroy {
  jobData$;
  destroy$ = new Subject();

  constructor(private statusService: StatusService, private jobService: JobService) {
  }

  ngOnInit() {
    this.jobData$ = this.statusService.refresh$.pipe(
      takeUntil(this.destroy$),
      flatMap(() => this.jobService.loadJobs()),
      share()
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
