import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formalTime',
})
export class FormalTimePipe implements PipeTransform {
  /**
   * Transforms the seconds into the formal hh:mm:ss format.
   * @param totalSeconds Total number of seconds.
   */
  transform(totalSeconds: number): string {
    if (!totalSeconds || totalSeconds <= 0) {
      return `00:00:00`;
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = (totalSeconds % 3600) % 60;

    const result = `${this.renderUnit(hours)}:${this.renderUnit(
      minutes,
    )}:${this.renderUnit(seconds)}`;

    return result.trim();
  }

  /**
   * Prepends '0' charachter if the value is below 10.
   * @param value Value to be rendered.
   */
  private renderUnit(value: number): string {
    return `${value < 10 ? '0' + value : value}`;
  }
}
