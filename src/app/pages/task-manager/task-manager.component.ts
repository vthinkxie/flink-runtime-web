import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { flatMap, takeUntil } from 'rxjs/operators';
import { StatusService, TaskManagerService } from 'services';

@Component({
  selector   : 'flink-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls  : [ './task-manager.component.less' ]
})
export class TaskManagerComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskManagerService: TaskManagerService,
    private statusService: StatusService) {
  }

  ngOnInit() {
    this.statusService.refresh$.pipe(
      takeUntil(this.destroy$),
      flatMap(() => this.taskManagerService.loadManager(this.activatedRoute.snapshot.params.taskManagerId))
    ).subscribe(data => {
      this.taskManagerService.taskManagerDetail = data;
      this.taskManagerService.taskManagerDetail$.next(data);
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.taskManagerService.taskManagerDetail = null;
  }
}
