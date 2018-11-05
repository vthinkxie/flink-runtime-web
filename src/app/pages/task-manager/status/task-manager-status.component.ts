import { Component, Input, OnInit } from '@angular/core';
import { TaskManagerService } from 'services';

@Component({
  selector   : 'flink-task-manager-status',
  templateUrl: './task-manager-status.component.html',
  styleUrls  : [ './task-manager-status.component.less' ]
})
export class TaskManagerStatusComponent implements OnInit {
  @Input() isLoading = true;
  listOfNavigation = [
    { path: 'metrics', title: 'Metrics' },
    { path: 'logs', title: 'Logs' },
    { path: 'stdout', title: 'Stdout' }
  ];

  get detail() {
    return this.taskManagerService.taskManagerDetail;
  }

  constructor(private taskManagerService: TaskManagerService) {
  }

  ngOnInit() {
  }

}
