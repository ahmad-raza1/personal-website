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

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffYears = Math.floor(diffDays / 365.25);
    const diffMonths = Math.floor((diffDays % 365.25) / 30.4375);
    const diffDaysRemaining = Math.floor(diffDays % 365.25 % 30.4375);

    let result = '';
    if (diffYears > 0) {
      result += `${diffYears} yr `;
    }
    if (diffMonths > 0) {
      result += diffMonths;
      result += diffMonths > 1 ? ' mos ' : ' mo ';
    }
    if (diffDaysRemaining > 0) {
      result += diffDaysRemaining;
      result += diffDaysRemaining > 1 ? ' days ' : ' day ';
    }

    return result.trim();
  }
}
