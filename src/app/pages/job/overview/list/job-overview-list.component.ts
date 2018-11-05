import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { deepFind } from 'core';
import { NodesItemCorrectInterface } from 'interfaces';

@Component({
  selector       : 'flink-job-overview-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl    : './job-overview-list.component.html',
  styleUrls      : [ './job-overview-list.component.less' ]
})
export class JobOverviewListComponent implements OnInit {
  _nodes: NodesItemCorrectInterface[] = [];
  sortName = 'detail.topology-id';
  sortValue = 'ascend';
  left = 390;
  @Output() nodeClick = new EventEmitter();
  @Input() selectedNode: NodesItemCorrectInterface;

  @Input()
  set nodes(value: NodesItemCorrectInterface[]) {
    this._nodes = value;
    this.search();
  }

  get nodes() {
    return this._nodes;
  }

  sort(sort: { key: string, value: string }) {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search() {
    if (this.sortName) {
      this._nodes = [ ...this._nodes.sort(
        (pre, next) => {
          if (this.sortValue === 'ascend') {
            return (deepFind(pre, this.sortName) > deepFind(next, this.sortName) ? 1 : -1);
          } else {
            return (deepFind(next, this.sortName) > deepFind(pre, this.sortName) ? 1 : -1);
          }
        }) ];
    }
  }


  trackJobBy(index, node) {
    return node.id;
  }

  clickNode(node: NodesItemCorrectInterface) {
    this.nodeClick.emit(node);
  }

  constructor(public elementRef: ElementRef) {
  }

  ngOnInit() {
  }

}
