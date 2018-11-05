import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input
} from '@angular/core';
import { select } from 'd3-selection';
import { NodesItemCorrectInterface } from 'interfaces';
import { isNil } from 'lodash';

@Component({
  selector       : '[flink-node]',
  templateUrl    : './node.component.html',
  styleUrls      : [ './node.component.less' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeComponent {

  visible = false;
  @Input() node = {} as NodesItemCorrectInterface;

  @HostListener('click')
  clickNode() {
    this.visible = false;
  }

  get inQDashArray(): string {
    return `${6.283 / 2 * (this.inQ || 0)} 6.283`;
  }

  get outQDashArray(): string {
    return `${6.283 / 2 * (this.outQ || 0)} 6.283`;
  }

  get id() {
    return this.node.id;
  }

  get name() {
    return this.node.description;
  }

  get parallelism() {
    return this.node.parallelism;
  }

  get inQ() {
    return this.node.detail && this.node.detail.metrics[ 'buffers.inPoolUsage_max' ];
  }

  get showInQ() {
    return !isNil(this.inQ);
  }

  get outQ() {
    return this.node.detail && this.node.detail.metrics[ 'buffers.outPoolUsage_max' ];
  }

  get showOutQ() {
    return !isNil(this.outQ);
  }

  get description() {
    return this.node.description.replace('&gt;', '>');
  }

  constructor(protected cd: ChangeDetectorRef) {
  }

  update(node): void {
    this.node = node;
    this.cd.markForCheck();
  }
}
