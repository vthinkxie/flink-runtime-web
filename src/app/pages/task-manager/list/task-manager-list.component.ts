import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first, flatMap, takeUntil } from 'rxjs/operators';
import { StatusService, TaskManagerService } from 'services';

@Component({
  selector   : 'flink-task-manager-list',
  templateUrl: './task-manager-list.component.html',
  styleUrls  : [ './task-manager-list.component.less' ]
})
export class TaskManagerListComponent implements OnInit, OnDestroy {
  listOfTaskManager = [];
  isLoading = true;
  destroy$ = new Subject();

  trackManagerBy(index, node) {
    return node.id;
  }

  navigateTo(taskManager) {
    this.router.navigate([ taskManager.id, 'metrics' ], { relativeTo: this.activatedRoute }).then();
  }

  constructor(
    private statusService: StatusService,
    private taskManagerService: TaskManagerService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.statusService.refresh$.pipe(
      first(),
      takeUntil(this.destroy$),
      flatMap(() => this.taskManagerService.loadManagers())
    ).subscribe(data => {
      this.isLoading = false;
      this.listOfTaskManager = data;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
