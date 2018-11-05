import { Component, OnInit } from '@angular/core';
import { first, flatMap } from 'rxjs/operators';
import { JobService } from 'services';

@Component({
  selector   : 'flink-job-checkpoints',
  templateUrl: './job-checkpoints.component.html',
  styleUrls  : [ './job-checkpoints.component.less' ]
})
export class JobCheckpointsComponent implements OnInit {
  checkPointStats = {};
  checkPointConfig;

  trackHistoryBy(index, node) {
    return node.id;
  }

  refresh() {
    this.jobService.loadCheckpointStats(this.jobService.jobDetail.jid).subscribe(data => this.checkPointStats = data);
    this.jobService.loadCheckpointConfig(this.jobService.jobDetail.jid).subscribe(data => this.checkPointConfig = data);
  }

  constructor(private jobService: JobService) {
  }

  ngOnInit() {
    this.jobService.jobDetail$.pipe(
      first(),
      flatMap(() => this.jobService.loadCheckpointStats(this.jobService.jobDetail.jid))
    ).subscribe(data => {
      this.checkPointStats = data;
    });
    this.jobService.jobDetail$.pipe(
      first(),
      flatMap(() => this.jobService.loadCheckpointConfig(this.jobService.jobDetail.jid))
    ).subscribe(data => {
      this.checkPointConfig = data;
    });
  }

}
