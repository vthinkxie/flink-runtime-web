import { Pipe, PipeTransform } from '@angular/core';
import { isNil } from 'lodash';

@Pipe({
  name: 'humanizeBytes'
})
export class HumanizeBytesPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if (isNil(value)) {
      return '-';
    }
    const units = [ 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB' ];
    const converter = (v, p) => {
      const base = Math.pow(1024, p);
      if (v < base) {
        return (v / base).toFixed(2) + ' ' + units[ p ];
      } else if (v < base * 1000) {
        return (v / base).toPrecision(3) + ' ' + units[ p ];
      } else {
        return converter(v, p + 1);
      }
    };
    if (value < 1000) {
      return value + ' B';
    } else {
      return converter(value, 1);
    }
  }

}
