import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { first, flatMap } from 'rxjs/operators';
import { TaskManagerService } from 'services';
import { MonacoEditorComponent } from 'share/common/monaco-editor/monaco-editor.component';

@Component({
  selector: 'flink-task-manager-stdout',
  templateUrl: './task-manager-stdout.component.html',
  styleUrls: ['./task-manager-stdout.component.less']
})
export class TaskManagerStdoutComponent implements OnInit {
  @ViewChild(MonacoEditorComponent) monacoEditorComponent: MonacoEditorComponent;
  stdout = '';

  constructor(private taskManagerService: TaskManagerService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.taskManagerService.taskManagerDetail$.pipe(
      first(),
      flatMap(() => this.taskManagerService.loadStdout(this.taskManagerService.taskManagerDetail.id))
    ).subscribe(data => {
      this.monacoEditorComponent.layout();
      this.stdout = data;
      this.cdr.markForCheck();
    });
  }
}
