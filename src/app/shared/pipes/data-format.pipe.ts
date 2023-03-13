import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      return value.replace(/\./g, '-');
    }
    return value;
  }
}
