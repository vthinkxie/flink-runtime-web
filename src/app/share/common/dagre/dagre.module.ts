import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NodeRectComponent } from './node-rect.component';
import { NodeComponent } from './node.component';
import { DagreComponent } from './dagre.component';
import { SvgContainerComponent } from './svg-container.component';

@NgModule({
  imports     : [
    CommonModule,
    FormsModule,
    NgZorroAntdModule
  ],
  declarations: [ DagreComponent, SvgContainerComponent, NodeComponent, NodeRectComponent ],
  exports     : [ DagreComponent, SvgContainerComponent, NodeComponent, NodeRectComponent ]
})
export class DagreModule {
}
