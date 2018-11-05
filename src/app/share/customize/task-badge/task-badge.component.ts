import { Component, Input } from '@angular/core';
import { COLOR_MAP } from '../../../app.config';
import { TaskStatusInterface } from 'interfaces';

@Component({
  selector   : 'flink-task-badge',
  templateUrl: './task-badge.component.html',
  styleUrls  : [ './task-badge.component.less' ]
})
export class TaskBadgeComponent {
  @Input() tasks = <TaskStatusInterface>{};
  statusList = Object.keys(COLOR_MAP);

  get colorMap() {
    return COLOR_MAP;
  }

  constructor() {
  }


}
