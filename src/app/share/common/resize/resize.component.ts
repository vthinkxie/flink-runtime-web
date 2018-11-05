import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';

export enum ResizeModeEnums {
  Vertical   = 'vertical',
  Horizontal = 'horizontal'
}

export type ResizeMode = ResizeModeEnums | 'vertical' | 'horizontal';

@Component({
  selector   : 'flink-resize',
  templateUrl: './resize.component.html',
  styleUrls  : [ './resize.component.less' ]
})
export class ResizeComponent implements OnInit {
  isMoving = false;
  @Input() left = 0;
  @Input() top = 0;
  @Input() baseElement;
  @Input() resizeMin = 0;
  @Input() mode: ResizeMode = ResizeModeEnums.Vertical;
  @Output() leftChange = new EventEmitter();
  @Output() topChange = new EventEmitter();
  @Output() resizeEnd = new EventEmitter<{ left: number, top: number }>();

  @ViewChild('trigger') trigger: ElementRef<HTMLDivElement>;
  startMove() {
    this.isMoving = true;
  }

  @HostListener('document:mouseup', ['$event'])
  mouseUp(e: MouseEvent) {

    this.isMoving = false;

    if (e.target === this.trigger.nativeElement) {
      e.stopPropagation();
      this.resizeEnd.emit({ left: this.left, top: this.top });
    }
  }

  @HostListener('document:mousemove', [ '$event' ])
  mouseMove(e) {
    if (!this.isMoving) {
      return;
    }
    e.preventDefault();
    if (this.mode === ResizeModeEnums.Vertical) {
      this.left = this.getResizeLeft(e);
      this.leftChange.emit(this.left);
    } else {
      this.top = this.getResizeTop(e);
      this.topChange.emit(this.top);
    }
  }

  getResizeTop(e: MouseEvent): number {
    const getOffsetTop = (elem) => {
      let _offsetTop = 0;
      do {
        if (!isNaN(elem.offsetTop)) {
          _offsetTop += elem.offsetTop;
        }
      } while (elem = elem.offsetParent);
      return _offsetTop;
    };
    const offsetTop = getOffsetTop(this.baseElement.nativeElement);
    const maxResize = 560;
    let newTop = e.pageY - offsetTop;
    if (newTop > maxResize) {
      newTop = maxResize;
    }
    if (newTop < this.resizeMin) {
      newTop = this.resizeMin;
    }
    return newTop;
  }

  getResizeLeft(e: MouseEvent): number {
    const getOffsetLeft = (elem) => {
      let _offsetLeft = 0;
      do {
        if (!isNaN(elem.offsetLeft)) {
          _offsetLeft += elem.offsetLeft;
        }
      } while (elem = elem.offsetParent);
      return _offsetLeft;
    };
    const offsetLeft = getOffsetLeft(this.baseElement.nativeElement);
    const maxResize = this.baseElement.nativeElement.getBoundingClientRect().width - 200;
    let newLeft = e.pageX - offsetLeft;
    if (newLeft > maxResize) {
      newLeft = maxResize;
    }
    if (newLeft < this.resizeMin) {
      newLeft = this.resizeMin;
    }
    return newLeft;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
