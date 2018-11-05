import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PipeModule } from 'pipes/pipe.module';
import { ShareModule } from 'share/share.module';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { OverviewStatisticComponent } from './statistic/overview-statistic.component';

@NgModule({
  imports     : [
    CommonModule,
    NgZorroAntdModule,
    ShareModule,
    OverviewRoutingModule,
    PipeModule
  ],
  declarations: [ OverviewComponent, OverviewStatisticComponent ]
})
export class OverviewModule {
}
