import { Pipe, PipeTransform } from '@angular/core';
import { isNil } from 'lodash';

@Pipe({
  name: 'humanizeDuration'
})
export class HumanizeDurationPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if (isNil(value)) {
      return '-';
    } else if (value < 0) {
      return '-';
    } else {
      const ms = value % 1000;
      let x = Math.floor(value / 1000);
      const seconds = x % 60;
      x = Math.floor(x / 60);
      const minutes = x % 60;
      x = Math.floor(x / 60);
      const hours = x % 24;
      x = Math.floor(x / 24);
      const days = x;
      if (days === 0) {
        if (hours === 0) {
          if (minutes === 0) {
            if (seconds === 0) {
              return `${ms}ms`;
            } else {
              return `${seconds}s`;
            }
          } else {
            return `${minutes}m ${seconds}s`;
          }
        } else {
          return `${hours}h ${minutes}m`;
        }
      } else {
        return `${days}d ${hours}h ${minutes}m`;
      }
    }
  }

}
