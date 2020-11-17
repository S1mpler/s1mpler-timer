import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '@timer/models/task.model';
import { TimerService } from '@timer/services/timer.service';

@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.component.html',
  styleUrls: ['./completed-task.component.scss'],
})
export class CompletedTaskComponent {
  @Input() task: Task;
  @Output() resumeTask = new EventEmitter<Task>();

  constructor(private timerService: TimerService) {}

  /**
   * Emits resume timer event for this task.
   */
  public continueTaskTimer(): void {
    this.resumeTask.emit(this.task);
  }

  /**
   * Getter to retrieve the number of seconds was spend on the task.
   */
  get secondsSpend(): number {
    return this.timerService.getDifferenceInSeconds(
      new Date(this.task.endedAt),
      new Date(this.task.startedAt),
    );
  }
}
