import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ShareModule } from 'share/share.module';

import { SubmitRoutingModule } from './submit-routing.module';
import { SubmitComponent } from './submit.component';

@NgModule({
  imports     : [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    SubmitRoutingModule,
    ShareModule
  ],
  declarations: [ SubmitComponent ]
})
export class SubmitModule {
}
