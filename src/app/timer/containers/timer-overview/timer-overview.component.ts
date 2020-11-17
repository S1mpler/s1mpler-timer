import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from '@timer/services/project.service';
import { Project } from '@timer/models/project.model';
import { Task } from '@timer/models/task.model';
import { TimerService } from '@timer/services/timer.service';
import { TaskService } from '@timer/services/task.service';
import { TaskGroup } from '@timer/models/task-group.model';
import { Store } from '@ngrx/store';
import { TasksState } from '@state/models/tasks-state.model';
import {
  CompleteTask,
  LoadTasksState,
  StartTask,
} from '@state/tasks/tasks.actions';
import { completedTasksSelector, currentTaskSelector } from '@app/state';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-timer-overview',
  templateUrl: './timer-overview.component.html',
  styleUrls: ['./timer-overview.component.scss'],
})
export class TimerOverviewComponent implements OnInit {
  public completedTasksGroups$: Observable<TaskGroup[]>;
  public projects$: Observable<Project[]>;

  public completedTasks$: Observable<Task[]>;
  public currentTask$: Observable<Task>;

  constructor(
    private projectService: ProjectService,
    private timerService: TimerService,
    private taskService: TaskService,
    private store: Store<TasksState>,
  ) {}

  ngOnInit(): void {
    // Load initial state data from local storage
    this.store.dispatch(new LoadTasksState(null));

    // Initialize data channels
    this.completedTasks$ = this.store.select(completedTasksSelector);
    this.currentTask$ = this.store.select(currentTaskSelector).pipe(
      tap(task => {
        if (!task) return;
        this.timerService.start(task.startedAt);
      }),
    );

    // Define available projects
    this.projects$ = this.projectService.getProjectList();
    this.completedTasksGroups$ = this.completedTasks$.pipe(
      switchMap(tasks => this.taskService.combinedTasks(tasks)),
    );
  }

  /**
   * Initialize the timer and dispatch start action.
   * @param task Task to be started.
   */
  public handleTimerStart(task: Task): void {
    this.timerService.start();
    this.store.dispatch(new StartTask(task));
  }

  /**
   * Terminate the timer and dispatch complete action.
   * @param task Task to be completed.
   */
  public handleTimerStop(task: Task): void {
    this.timerService.stop();
    this.store.dispatch(new CompleteTask(task));
  }
}
