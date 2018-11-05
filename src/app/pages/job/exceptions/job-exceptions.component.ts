import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { first, flatMap } from 'rxjs/operators';
import { JobService } from 'services';
import { MonacoEditorComponent } from 'share/common/monaco-editor/monaco-editor.component';

@Component({
  selector       : 'flink-job-exceptions',
  templateUrl    : './job-exceptions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls      : [ './job-exceptions.component.less' ]
})
export class JobExceptionsComponent implements OnInit {
  @ViewChild(MonacoEditorComponent) monacoEditorComponent: MonacoEditorComponent;
  rootException = '';
  listOfException = [];

  trackExceptionBy(index, node) {
    return node.id;
  }

  constructor(private jobService: JobService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.jobService.jobDetail$.pipe(
      first(),
      flatMap(() => this.jobService.loadExceptions(this.jobService.jobDetail.jid))
    ).subscribe(data => {
      this.monacoEditorComponent.layout();
      if (data[ 'root-exception' ]) {
        this.rootException = formatDate(data.timestamp, 'yyyy-MM-dd HH:mm:ss', 'en') + '\n' + data[ 'root-exception' ];
      } else {
        this.rootException = 'No Root Exception';
      }
      this.listOfException = data[ 'all-exceptions' ];
      this.cdr.markForCheck();
    });
  }

}
