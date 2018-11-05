import { ChangeDetectorRef, Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { first, flatMap } from 'rxjs/operators';
import { TaskManagerService } from 'services';
import { MonacoEditorComponent } from 'share/common/monaco-editor/monaco-editor.component';

@Component({
  selector       : 'flink-task-manager-logs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl    : './task-manager-logs.component.html',
  styleUrls      : [ './task-manager-logs.component.less' ]
})
export class TaskManagerLogsComponent implements OnInit {
  @ViewChild(MonacoEditorComponent) monacoEditorComponent: MonacoEditorComponent;
  logs = '';

  constructor(private taskManagerService: TaskManagerService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.taskManagerService.taskManagerDetail$.pipe(
      first(),
      flatMap(() => this.taskManagerService.loadLogs(this.taskManagerService.taskManagerDetail.id))
    ).subscribe(data => {
      this.monacoEditorComponent.layout();
      this.logs = data;
      this.cdr.markForCheck();
    });
  }

}
