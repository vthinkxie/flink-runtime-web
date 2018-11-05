import { AfterViewInit, Component, ElementRef, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';

declare const monaco: any;

@Component({
  selector       : 'flink-monaco-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl    : './monaco-editor.component.html',
  styleUrls      : [ './monaco-editor.component.less' ]
})
export class MonacoEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  _value = '';
  editor;

  @Input()
  set value(value) {
    this._value = value;
    if (this.editor) {
      this.editor.getModel().setValue(value);
    }
  }

  get value() {
    return this._value;
  }

  setupMonaco() {
    const hostElement = this.elementRef.nativeElement;
    this.editor = monaco.editor.create(hostElement, {
      scrollBeyondLastLine: false,
      glyphMargin         : true,
      language            : 'apex',
      wordWrap            : 'on',
      readOnly            : true,
      minimap             : {
        enabled: false
      }
    });
    if (this.value) {
      this.editor.getModel().setValue(this.value);
    }
  }

  layout() {
    if (this.editor) {
      this.editor.layout();
    }
  }

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const windowAny = window as any;
    if (windowAny.monaco) {
      this.setupMonaco();
    } else {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'libs/vs/loader.js';
      script.onload = () => {
        const onGotAmdLoader = () => {
          // Load monaco
          windowAny.require.config({ paths: { 'vs': 'libs/vs' } });
          windowAny.require([ 'vs/editor/editor.main' ], () => {
            setTimeout(() => {
              this.setupMonaco();
            });
          });
        };
        onGotAmdLoader();
      };
      // Add the script tag to the page in order to start loading monaco
      document.body.appendChild(script);
    }
  }

  ngOnDestroy() {
    this.editor.dispose();
  }

}
