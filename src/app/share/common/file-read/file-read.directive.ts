import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[flinkFileRead]'
})
export class FileReadDirective {

  @Output() fileRead = new EventEmitter();

  @HostListener('change', [ '$event' ])
  onChange(changeEvent) {
    this.fileRead.emit(changeEvent.target.files[ 0 ]);
  }

  constructor() {
  }

}
