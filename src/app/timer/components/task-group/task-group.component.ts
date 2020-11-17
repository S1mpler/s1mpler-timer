import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskGroup } from '@timer/models/task-group.model';
import { Task } from '@timer/models/task.model';
import { TaskService } from '@timer/services/task.service';

@Component({
  selector: 'app-task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.scss'],
})
export class TaskGroupComponent {
  @Input() group: TaskGroup;
  @Output() resumeTask = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  /**
   * Emits resume timer event for this task.
   */
  public continueTaskTimer(task: Task): void {
    this.resumeTask.emit(task);
  }

  /**
   * Returns true of the group date is today.
   */
  get isToday(): boolean {
    return this.taskService.isSameDate(new Date(), this.group.date);
  }
}
