import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilKeyChanged, takeUntil } from 'rxjs/operators';
import { JobDetailCorrectInterface } from 'interfaces';
import { JobService } from 'services';

@Component({
  selector   : 'flink-job-status',
  templateUrl: './job-status.component.html',
  styleUrls  : [ './job-status.component.less' ]
})
export class JobStatusComponent implements OnInit, OnDestroy {
  @Input() isLoading = true;
  tips;
  destroy$ = new Subject();
  listOfNavigation = [
    {
      path : 'overview',
      title: 'Overview'
    },
    {
      path : 'exceptions',
      title: 'Exceptions'
    },
    {
      path : 'timeline',
      title: 'TimeLine'
    },
    {
      path : 'checkpoints',
      title: 'Checkpoints'
    },
    {
      path : 'configuration',
      title: 'Configuration'
    }
  ];

  get detail(): JobDetailCorrectInterface {
    return this.jobService.jobDetail;
  }

  stopJob() {
    this.jobService.stopJob(this.detail.jid).subscribe(() => {
      this.tips = 'Stopping...';
    });
  }

  cancelJob() {
    this.jobService.cancelJob(this.detail.jid).subscribe(() => {
      this.tips = 'Cancelling...';
    });
  }

  constructor(private jobService: JobService) {
  }

  ngOnInit() {
    this.jobService.jobDetail$.pipe(
      takeUntil(this.destroy$),
      distinctUntilKeyChanged('state')
    ).subscribe(() => {
      this.tips = '';
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
