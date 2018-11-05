import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PipeModule } from 'pipes/pipe.module';
import { DagreModule } from './common/dagre/dagre.module';
import { LayoutComponent } from './common/layout/layout.component';
import { TaskBadgeComponent } from './customize/task-badge/task-badge.component';
import { JobBadgeComponent } from './customize/job-badge/job-badge.component';
import { JobListComponent } from './customize/job-list/job-list.component';
import { MonacoEditorComponent } from './common/monaco-editor/monaco-editor.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { FileReadDirective } from './common/file-read/file-read.directive';
import { ResizeComponent } from './common/resize/resize.component';
import { JobChartComponent } from './customize/job-chart/job-chart.component';

@NgModule({
  imports     : [
    CommonModule,
    NgZorroAntdModule,
    PipeModule,
    RouterModule,
    DagreModule,
    FormsModule
  ],
  declarations: [
    LayoutComponent,
    TaskBadgeComponent,
    JobBadgeComponent,
    JobListComponent,
    MonacoEditorComponent,
    NavigationComponent,
    FileReadDirective,
    ResizeComponent,
    JobChartComponent
  ],
  exports     : [
    LayoutComponent,
    TaskBadgeComponent,
    JobBadgeComponent,
    JobListComponent,
    DagreModule,
    MonacoEditorComponent,
    NavigationComponent,
    FileReadDirective,
    ResizeComponent,
    JobChartComponent
  ]
})
export class ShareModule {
}
