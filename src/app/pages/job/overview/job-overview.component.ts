import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { first, skip, takeUntil } from 'rxjs/operators';
import { NodesItemCorrectInterface } from 'interfaces';
import { JobService } from 'services';
import { DagreComponent } from 'share/common/dagre/dagre.component';
import { trigger, state, animate, style, transition } from '@angular/animations';

@Component({
  selector       : 'flink-job-overview',
  templateUrl    : './job-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations     : [
    trigger('drawer', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate(150)
      ]),
      transition('* => void', [
        animate(150, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ],
  styleUrls      : [ './job-overview.component.less' ]
})
export class JobOverviewComponent implements OnInit, OnDestroy {
  nodes = [];
  links = [];
  destroy$ = new Subject();
  selectedNode: NodesItemCorrectInterface;
  top = 500;
  @ViewChild(DagreComponent) dagreComponent: DagreComponent;

  onNodeClick(node: NodesItemCorrectInterface) {
    this.selectedNode = node;
  }

  onListNodeClick(node: NodesItemCorrectInterface) {
    this.dagreComponent.focusNode(node);
  }

  onCloseDrawer() {
    this.dagreComponent.clickBg();
  }

  onResizeEnd() {
    if (!this.selectedNode) {
      this.dagreComponent.moveToCenter();
    } else {
      this.dagreComponent.focusNode(this.selectedNode, true);
    }
  }

  constructor(private jobService: JobService, public elementRef: ElementRef) {
  }

  ngOnInit() {
    this.jobService.jobDetail$.pipe(
      takeUntil(this.destroy$),
      first()
    ).subscribe(data => {
      this.nodes = data.plan.nodes;
      this.links = data.plan.links;
      this.dagreComponent.flush(this.nodes, this.links, true);
    });
    this.jobService.jobDetail$.pipe(
      takeUntil(this.destroy$),
      skip(1)
    ).subscribe(data => {
      this.nodes = data.plan.nodes;
      this.nodes.forEach(node => {
        this.dagreComponent.updateNode(node.id, node);
        if (this.selectedNode && (this.selectedNode.id === node.id)) {
          this.selectedNode = node;
        }
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
