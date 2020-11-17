import { Pipe, PipeTransform } from '@angular/core';

enum TimeUnit {
  HOURS = 'h',
  MINUTES = 'min',
  SECONDS = 'sec',
}

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  /**
   * Renders time in the following format: 1h 15min 10sec
   * @param totalSeconds Total number of seconds.
   */
  transform(totalSeconds: number): string {
    if (!totalSeconds || totalSeconds <= 0) {
      return `0 ${TimeUnit.SECONDS}`;
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = (totalSeconds % 3600) % 60;

    const result = `${this.renderHours(hours)} ${this.renderMinutes(
      minutes,
    )} ${this.renderSeconds(seconds)}`;

    return result.trim();
  }

  /**
   * Renders hours if the amount is more than 0.
   * @param hours Number of hours.
   */
  private renderHours(hours: number): string {
    return hours > 0 ? `${hours}${TimeUnit.HOURS}` : '';
  }

  /**
   * Renders minutes if the amount is more than 0.
   * @param minutes Number of minutes.
   */
  private renderMinutes(minutes: number): string {
    return minutes > 0 ? `${minutes} ${TimeUnit.MINUTES}` : '';
  }

  /**
   * Renders seconds if the amount is more than 0.
   * @param seconds Number of seconds.
   */
  private renderSeconds(seconds: number): string {
    return seconds > 0 ? `${seconds} ${TimeUnit.SECONDS}` : '';
  }
}
