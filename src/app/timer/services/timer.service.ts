import { Injectable } from '@angular/core';
import { Observable, interval, BehaviorSubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  public timer$ = new Observable<number>();
  public initialTime$ = new BehaviorSubject<number>(0);

  private active$ = new BehaviorSubject<boolean>(false);
  private secondsOffset: number;
  private interval$ = interval(1000);

  constructor() {
    // Launch the timer with an offset (0 if not provided) if active state is true.
    this.timer$ = this.active$.pipe(
      switchMap(isActive =>
        isActive
          ? this.interval$.pipe(map(seconds => seconds + this.secondsOffset))
          : this.initialTime$,
      ),
    );
  }

  /**
   * Fires an activation event. If startFrom is provided, creates the time offset.
   * @param startFrom (optional) A date object to start timing from.
   */
  public start(startFrom?: Date) {
    if (startFrom) {
      this.secondsOffset = this.getDifferenceInSeconds(
        new Date(),
        new Date(startFrom),
      );
    }

    this.active$.next(true);
  }

  /**
   * Fires a deactivation event.
   */
  public stop() {
    this.active$.next(false);
  }

  /**
   * Return a number which indicates a time difference between two dates in seconds.
   * @param date1 First date object.
   * @param date2 Second date object.
   */
  public getDifferenceInSeconds(date1: Date, date2: Date): number {
    return date1 ? Math.floor((date1.getTime() - date2.getTime()) / 1000) : 0;
  }
}
