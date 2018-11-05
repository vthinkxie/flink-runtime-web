import { Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy, ViewChildren, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, flatMap, startWith, takeUntil } from 'rxjs/operators';
import { NodesItemCorrectInterface } from 'interfaces';
import { JobService, MetricsService, StatusService } from 'services';
import { JobChartComponent } from 'share/customize/job-chart/job-chart.component';

@Component({
  selector       : 'flink-job-overview-drawer-chart',
  templateUrl    : './job-overview-drawer-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls      : [ './job-overview-drawer-chart.component.less' ]
})
export class JobOverviewDrawerChartComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  data = [];
  listOfMetricName = [];
  listOfSelectedMetric = [];
  listOfUnselectedMetric = [];
  _node: NodesItemCorrectInterface;
  @ViewChildren(JobChartComponent) listOfJobChartComponent: QueryList<JobChartComponent>;

  @Input()
  set node(value: NodesItemCorrectInterface) {
    if (this._node && (value.id !== this._node.id)) {
      this.loadMetricList();
    }
    this._node = value;
  }

  get node() {
    return this._node;
  }

  loadMetricList() {
    this.metricsService.getAllAvailableMetrics(this.jobService.jobDetail.jid, this.node.id).subscribe(data => {
      this.listOfMetricName = data.map(item => item.id);
      this.listOfSelectedMetric = [];
      this.updateUnselectedMetricList();
    });
  }

  updateMetric(metric) {
    this.listOfSelectedMetric = [ ...this.listOfSelectedMetric, metric ];
    this.updateUnselectedMetricList();
  }

  closeMetric(metric) {
    this.listOfSelectedMetric = this.listOfSelectedMetric.filter(item => item !== metric);
    this.updateUnselectedMetricList();
  }

  updateUnselectedMetricList() {
    this.listOfUnselectedMetric = this.listOfMetricName.filter(item => this.listOfSelectedMetric.indexOf(item) === -1);
  }

  constructor(private statusService: StatusService, private metricsService: MetricsService, private jobService: JobService) {
  }

  ngOnInit() {
    this.loadMetricList();
    this.statusService.refresh$.pipe(
      startWith(true),
      takeUntil(this.destroy$),
      filter(() => this.listOfSelectedMetric.length > 0),
      flatMap(() => this.metricsService.getMetrics(this.jobService.jobDetail.jid, this.node.id, this.listOfSelectedMetric))
    ).subscribe((res) => {
      if (this.listOfJobChartComponent && this.listOfJobChartComponent.length) {
        this.listOfJobChartComponent.forEach(chart => {
          chart.refresh(res);
        });
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
