import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'overview', loadChildren: './pages/overview/overview.module#OverviewModule' },
  { path: 'job', loadChildren: './pages/job/job.module#JobModule' },
  { path: 'job-manager', loadChildren: './pages/job-manager/job-manager.module#JobManagerModule' },
  { path: 'task-manager', loadChildren: './pages/task-manager/task-manager.module#TaskManagerModule' },
  { path: 'submit', loadChildren: './pages/submit/submit.module#SubmitModule' },
  { path: '**', redirectTo: 'overview', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
