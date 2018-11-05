import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'humanizeDate'
})
export class HumanizeDatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {
  }

  transform(value: any, format = 'mediumDate', timezone?: string, locale?: string): string | null {
    if (value == null || value === '' || value !== value || value < 0) {
      return '-';
    }

    try {
      return formatDate(value, format, locale || this.locale, timezone);
    } catch (error) {
    }
  }
}
