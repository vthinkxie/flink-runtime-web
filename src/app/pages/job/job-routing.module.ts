import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from 'share/customize/job-list/job-list.component';
import { JobCheckpointsComponent } from './checkpoints/job-checkpoints.component';
import { JobConfigurationComponent } from './configuration/job-configuration.component';
import { JobExceptionsComponent } from './exceptions/job-exceptions.component';
import { JobOverviewComponent } from './overview/job-overview.component';
import { JobComponent } from './job.component';
import { JobTimelineComponent } from './timeline/job-timeline.component';

const routes: Routes = [
  {
    path     : 'running',
    component: JobListComponent,
    data     : {
      title    : 'Running Jobs',
      completed: false
    }
  },
  {
    path     : 'completed',
    component: JobListComponent,
    data     : {
      title    : 'Completed Jobs',
      completed: true
    }
  },
  {
    path     : ':jid',
    component: JobComponent,
    children : [
      {
        path     : 'overview',
        component: JobOverviewComponent,
        data     : {
          path: 'overview'
        }
      },
      {
        path     : 'timeline',
        component: JobTimelineComponent,
        data     : {
          path: 'timeline'
        }
      },
      {
        path     : 'exceptions',
        component: JobExceptionsComponent,
        data     : {
          path: 'exceptions'
        }
      },
      {
        path     : 'configuration',
        component: JobConfigurationComponent,
        data     : {
          path: 'configuration'
        }
      },
      {
        path     : 'checkpoints',
        component: JobCheckpointsComponent,
        data     : {
          path: 'checkpoints'
        }
      },
      { path: '**', redirectTo: 'overview', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class JobRoutingModule {
}
