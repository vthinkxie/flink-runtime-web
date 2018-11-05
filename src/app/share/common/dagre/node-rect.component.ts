import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NodeComponent } from './node.component';

@Component({
  selector       : '[flink-node-rect]',
  templateUrl    : './node-rect.component.html',
  styleUrls      : [ './node-rect.component.less' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeRectComponent extends NodeComponent {

  constructor(protected cd: ChangeDetectorRef) {
    super(cd);
  }

}
