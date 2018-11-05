import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { JobService } from 'services';

@Component({
  selector   : 'flink-job-checkpoints-detail',
  templateUrl: './job-checkpoints-detail.component.html',
  styleUrls  : [ './job-checkpoints-detail.component.less' ]
})
export class JobCheckpointsDetailComponent implements OnInit {
  @Input() checkPoint;
  checkPointDetail;
  listOfVertex = [];
  isLoading = true;

  trackVertexBy(index, node) {
    return node.id;
  }

  constructor(private jobService: JobService) {
  }

  ngOnInit() {
    this.jobService.jobDetail$.pipe(
      first()
    ).subscribe(data => {
      this.listOfVertex = data.vertices;
      this.jobService.loadCheckpointDetails(this.jobService.jobDetail.jid, this.checkPoint.id).subscribe(detail => {
        this.checkPointDetail = detail;
        this.isLoading = false;
      });
    });
  }

}
