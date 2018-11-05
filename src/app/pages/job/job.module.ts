import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PipeModule } from 'pipes/pipe.module';
import { ShareModule } from 'share/share.module';

import { JobRoutingModule } from './job-routing.module';
import { JobStatusComponent } from './status/job-status.component';
import { JobComponent } from './job.component';
import { JobOverviewComponent } from './overview/job-overview.component';
import { JobOverviewDrawerComponent } from './overview/drawer/job-overview-drawer.component';
import { JobOverviewListComponent } from './overview/list/job-overview-list.component';
import { JobOverviewDrawerDetailComponent } from './overview/detail/job-overview-drawer-detail.component';
import { JobOverviewDrawerSubtasksComponent } from './overview/subtasks/job-overview-drawer-subtasks.component';
import { JobOverviewDrawerChartComponent } from './overview/chart/job-overview-drawer-chart.component';
import { JobOverviewDrawerWatermarksComponent } from './overview/watermarks/job-overview-drawer-watermarks.component';
import { JobOverviewDrawerAccumulatorsComponent } from './overview/accumulators/job-overview-drawer-accumulators.component';
import { JobOverviewDrawerBackpressureComponent } from './overview/backpressure/job-overview-drawer-backpressure.component';
import { JobTimelineComponent } from './timeline/job-timeline.component';
import { JobConfigurationComponent } from './configuration/job-configuration.component';
import { JobExceptionsComponent } from './exceptions/job-exceptions.component';
import { JobCheckpointsComponent } from './checkpoints/job-checkpoints.component';
import { JobCheckpointsDetailComponent } from './checkpoints/detail/job-checkpoints-detail.component';
import { JobCheckpointsSubtaskComponent } from './checkpoints/subtask/job-checkpoints-subtask.component';
import { JobOverviewDrawerTaskmanagersComponent } from './overview/taskmanagers/job-overview-drawer-taskmanagers.component';

@NgModule({
  imports     : [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    ShareModule,
    PipeModule,
    JobRoutingModule
  ],
  declarations: [
    JobStatusComponent,
    JobComponent,
    JobOverviewComponent,
    JobOverviewDrawerComponent,
    JobOverviewListComponent,
    JobOverviewDrawerDetailComponent,
    JobOverviewDrawerSubtasksComponent,
    JobOverviewDrawerChartComponent,
    JobOverviewDrawerWatermarksComponent,
    JobOverviewDrawerAccumulatorsComponent,
    JobOverviewDrawerBackpressureComponent,
    JobTimelineComponent,
    JobConfigurationComponent,
    JobExceptionsComponent,
    JobCheckpointsComponent,
    JobCheckpointsDetailComponent,
    JobCheckpointsSubtaskComponent,
    JobOverviewDrawerTaskmanagersComponent
  ]
})
export class JobModule {
}
