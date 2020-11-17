import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '@timer/models/project.model';
import { TimerService } from '@timer/services/timer.service';
import { Task } from '@timer/models/task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timer-bar',
  templateUrl: './timer-bar.component.html',
  styleUrls: ['./timer-bar.component.scss'],
})
export class TimerBarComponent implements OnInit {
  @Input() projects: Project[];
  @Input() currentTask$: Observable<Task>;

  @Output() startTask = new EventEmitter<Task>();
  @Output() stopTask = new EventEmitter<Task>();

  public taskData: Task = null;
  public selectedProjectId: number = null;
  public isTimerOn = false;
  public startedAt: Date;

  // Default task data object
  private defaultTask: Task = Object.freeze({
    title: null,
    project: null,
    startedAt: null,
    endedAt: null,
  });

  constructor(public timerService: TimerService) {}

  ngOnInit(): void {
    this.taskData = Object.assign({}, this.defaultTask);
    this.currentTask$.subscribe(currentTask => {
      if (currentTask) {
        this.isTimerOn = true;
        this.taskData = currentTask;
        this.startedAt = currentTask.startedAt;
        this.selectedProjectId = this.taskData.project.id;
      } else {
        this.cleanData();
      }
    });
  }

  /**
   * Emits timer start.
   */
  public startTimer(): void {
    this.isTimerOn = true;
    this.startedAt = new Date();
    this.startTask.emit({
      title: this.taskData.title,
      project: this.getProjectById(this.selectedProjectId),
      startedAt: this.startedAt,
      endedAt: null,
    });
  }

  /**
   * Emits timer stop.
   */
  public stopTimer(): void {
    this.isTimerOn = false;
    this.stopTask.emit({
      title: this.taskData.title,
      project: this.getProjectById(this.selectedProjectId),
      startedAt: this.startedAt,
      endedAt: new Date(),
    });
  }

  /**
   * Returns a project with the provided id.
   * @param id Id of a project/
   */
  private getProjectById(id: number): Project {
    return this.projects.find(project => project.id === id);
  }

  /**
   * Cleans up task data and input bindings.
   */
  private cleanData(): void {
    this.taskData = Object.assign({}, this.defaultTask);
    this.selectedProjectId = null;
    this.startedAt = null;
  }
}
