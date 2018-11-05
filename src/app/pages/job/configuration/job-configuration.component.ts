import { Component, OnInit } from '@angular/core';
import { first, flatMap } from 'rxjs/operators';
import { JobService } from 'services';

@Component({
  selector   : 'flink-job-configuration',
  templateUrl: './job-configuration.component.html',
  styleUrls  : [ './job-configuration.component.less' ]
})
export class JobConfigurationComponent implements OnInit {
  config;
  listOfUserConfig = [];

  constructor(private jobService: JobService) {
  }

  ngOnInit() {
    this.jobService.jobDetail$.pipe(
      first(),
      flatMap(() => this.jobService.loadJobConfig(this.jobService.jobDetail.jid))
    ).subscribe(data => {
      this.config = data;
      const userConfig = this.config[ 'execution-config' ][ 'user-config' ];
      const array = [];
      for (const key in userConfig) {
        array.push({
          key  : key,
          value: userConfig[ key ]
        });
      }
      this.listOfUserConfig = array;
    });
  }

}
