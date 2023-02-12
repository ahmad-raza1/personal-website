import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(startDate: Date, endDate: Date): string {

    if (typeof (startDate) === "string") {
      startDate = new Date(startDate);
    }
    if (typeof (endDate) === "string") {
      endDate = new Date(endDate);
    }

    const diffInTime = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    const diffInYears = Math.floor(diffInDays / 365);
    const diffInMonths = Math.floor((diffInDays % 365) / 30);

    return `${diffInYears} yr ${diffInMonths} mos`;
  }
}
