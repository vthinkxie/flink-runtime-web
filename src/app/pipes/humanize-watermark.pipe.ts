import { Pipe, PipeTransform } from '@angular/core';
import { LONG_MIN_VALUE } from '../app.config';

@Pipe({
  name: 'humanizeWatermark'
})
export class HumanizeWatermarkPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (isNaN(value) || value <= LONG_MIN_VALUE) {
      return 'No Watermark';
    } else {
      return value;
    }
  }

}
