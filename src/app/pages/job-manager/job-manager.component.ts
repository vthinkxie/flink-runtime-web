import { Component } from '@angular/core';

@Component({
  selector   : 'flink-job-manager',
  templateUrl: './job-manager.component.html',
  styleUrls  : [ './job-manager.component.less' ]
})
export class JobManagerComponent {
  listOfNavigation = [
    { path: 'config', title: 'Configuration' },
    { path: 'logs', title: 'Logs' },
    { path: 'stdout', title: 'Stdout' }
  ];
}
