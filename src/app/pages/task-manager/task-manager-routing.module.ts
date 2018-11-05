import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskManagerComponent } from './task-manager.component';
import { TaskManagerListComponent } from './list/task-manager-list.component';
import { TaskManagerLogsComponent } from './logs/task-manager-logs.component';
import { TaskManagerMetricsComponent } from './metrics/task-manager-metrics.component';
import { TaskManagerStdoutComponent } from './stdout/task-manager-stdout.component';

const routes: Routes = [
  {
    path     : '',
    component: TaskManagerListComponent
  },
  {
    path     : ':taskManagerId',
    component: TaskManagerComponent,
    children : [
      {
        path     : 'metrics',
        component: TaskManagerMetricsComponent,
        data     : {
          path: 'metrics'
        }
      },
      {
        path     : 'logs',
        component: TaskManagerLogsComponent,
        data     : {
          path: 'logs'
        }
      },
      {
        path     : 'stdout',
        component: TaskManagerStdoutComponent,
        data     : {
          path: 'stdout'
        }
      },
      {
        path      : '**',
        redirectTo: 'metrics',
        pathMatch : 'full'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TaskManagerRoutingModule {
}
