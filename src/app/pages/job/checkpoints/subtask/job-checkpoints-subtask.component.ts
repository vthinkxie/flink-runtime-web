import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { deepFind } from 'core';
import { JobService } from 'services';

@Component({
  selector   : 'flink-job-checkpoints-subtask',
  templateUrl: './job-checkpoints-subtask.component.html',
  styleUrls  : [ './job-checkpoints-subtask.component.less' ]
})
export class JobCheckpointsSubtaskComponent implements OnInit {
  @Input() vertex;
  @Input() checkPoint;
  subTaskCheckPoint;
  listOfSubTaskCheckPoint = [];
  isLoading = true;
  sortName = null;
  sortValue = null;


  sort(sort: { key: string, value: string }) {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search() {
    if (this.sortName) {
      this.listOfSubTaskCheckPoint = [ ...this.listOfSubTaskCheckPoint.sort(
        (pre, next) => {
          if (this.sortValue === 'ascend') {
            return (deepFind(pre, this.sortName) > deepFind(next, this.sortName) ? 1 : -1);
          } else {
            return (deepFind(next, this.sortName) > deepFind(pre, this.sortName) ? 1 : -1);
          }
        }) ];
    }
  }

  constructor(private jobService: JobService) {
  }

  ngOnInit() {
    this.jobService.jobDetail$.pipe(
      first()
    ).subscribe(() => {
      this.jobService.loadCheckpointSubtaskDetails(this.jobService.jobDetail.jid, this.checkPoint.id, this.vertex.id).subscribe(data => {
        this.subTaskCheckPoint = data;
        this.listOfSubTaskCheckPoint = (data && data[ 'subtasks' ]) || [];
        this.isLoading = false;
      });
    });
  }

}
