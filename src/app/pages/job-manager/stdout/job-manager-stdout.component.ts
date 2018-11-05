import { ChangeDetectorRef, Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { JobManagerService } from 'services';
import { MonacoEditorComponent } from 'share/common/monaco-editor/monaco-editor.component';

@Component({
  selector       : 'flink-job-manager-stdout',
  templateUrl    : './job-manager-stdout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls      : [ './job-manager-stdout.component.less' ]
})
export class JobManagerStdoutComponent implements OnInit {
  @ViewChild(MonacoEditorComponent) monacoEditorComponent: MonacoEditorComponent;
  stdout = '';

  constructor(private jobManagerService: JobManagerService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.jobManagerService.loadStdout().subscribe(data => {
      this.monacoEditorComponent.layout();
      this.stdout = data;
      this.cdr.markForCheck();
    });
  }
}
