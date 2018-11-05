import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ShareModule } from 'share/share.module';

import { JobManagerRoutingModule } from './job-manager-routing.module';
import { JobManagerComponent } from './job-manager.component';
import { JobManagerConfigurationComponent } from './configuration/job-manager-configuration.component';
import { JobManagerLogsComponent } from './logs/job-manager-logs.component';
import { JobManagerStdoutComponent } from './stdout/job-manager-stdout.component';

@NgModule({
  imports     : [
    CommonModule,
    ShareModule,
    NgZorroAntdModule,
    JobManagerRoutingModule
  ],
  declarations: [
    JobManagerComponent,
    JobManagerConfigurationComponent,
    JobManagerLogsComponent,
    JobManagerStdoutComponent
  ]
})
export class JobManagerModule {
}
