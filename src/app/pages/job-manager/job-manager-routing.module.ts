import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobManagerConfigurationComponent } from './configuration/job-manager-configuration.component';
import { JobManagerComponent } from './job-manager.component';
import { JobManagerLogsComponent } from './logs/job-manager-logs.component';
import { JobManagerStdoutComponent } from './stdout/job-manager-stdout.component';

const routes: Routes = [
  {
    path     : '',
    component: JobManagerComponent,
    children : [
      {
        path     : 'config',
        component: JobManagerConfigurationComponent,
        data     : {
          path: 'config'
        }
      },
      {
        path     : 'logs',
        component: JobManagerLogsComponent,
        data     : {
          path: 'logs'
        }
      },
      {
        path     : 'stdout',
        component: JobManagerStdoutComponent,
        data     : {
          path: 'stdout'
        }
      },
      {
        path      : '**',
        redirectTo: 'config',
        pathMatch : 'full'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class JobManagerRoutingModule {
}
