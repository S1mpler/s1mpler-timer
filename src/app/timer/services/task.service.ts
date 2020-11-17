import { Injectable } from '@angular/core';
import { Task } from '@timer/models/task.model';
import { Observable, of } from 'rxjs';
import { TaskGroup } from '../models/task-group.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  /**
   * Returns an observable with created task group list @see {@link TaskGroup}
   * @param tasks A list of tasks to be grouped by date.
   */
  public combinedTasks(tasks: Task[]): Observable<TaskGroup[]> {
    return of(this.combineIntoDateGroups(tasks));
  }

  /**
   * Combines the list of provided tasks into the array of groups @see {@link TaskGroup}.
   * @param tasks Tasks to be combined into the groups.
   */
  private combineIntoDateGroups(tasks: Task[]): TaskGroup[] {
    const taskGroups: TaskGroup[] = [];
    tasks.forEach(task => {
      let groupExists = false;
      taskGroups.forEach((group: TaskGroup) => {
        if (this.isSameDate(group.date, new Date(task.endedAt))) {
          groupExists = true;
          group.tasks.push(task);
        }
      });

      if (!groupExists) {
        taskGroups.push({
          date: this.extractDate(new Date(task.endedAt)),
          tasks: [task],
        });
      }
    });
    return taskGroups.sort(
      (prev, next) => next.date.getTime() - prev.date.getTime(),
    );
  }

  /**
   * Compares two dates. Returns true if the dates (year, month, day) are the same (ignoring time).
   * @param date1 First date to compare.
   * @param date2 Second date to compare.
   */
  public isSameDate(date1: Date, date2: Date): boolean {
    return (
      this.extractDate(date1).getTime() === this.extractDate(date2).getTime()
    );
  }

  /**
   * Extracts only year, month and day information from the entire date-time object.
   * @param fullDate Complete date with time.
   */
  private extractDate(fullDate: Date): Date {
    return new Date(fullDate.toDateString());
  }
}
