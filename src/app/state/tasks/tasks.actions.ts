import { Action } from '@ngrx/store';
import { Task } from '@timer/models/task.model';

// Define available action types
export enum TaskActionType {
  LOAD = '[Task] State Loaded From Storage',
  START = '[Task] Started',
  COMPLETE = '[Task] Completed',
}

// Define actions
export class LoadTasksState implements Action {
  readonly type = TaskActionType.LOAD;
  constructor(private payload: Task) {}
}

export class StartTask implements Action {
  readonly type = TaskActionType.START;
  constructor(private payload: Task) {}
}

export class CompleteTask implements Action {
  readonly type = TaskActionType.COMPLETE;
  constructor(private payload: Task) {}
}

// Create a union type of available task actions
export type TaskActions = StartTask | CompleteTask;
