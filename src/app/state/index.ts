import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { TasksState } from './models/tasks-state.model';
import { tasksReducer } from './tasks/tasks.reducer';

// Create an interface for the application state
export interface AppState {
  tasks: TasksState;
}

// Combine reducers
export const reducers: ActionReducerMap<AppState> = {
  tasks: tasksReducer,
};

// Create selectors
export const tasksSelector = createFeatureSelector<TasksState>('tasks');

export const completedTasksSelector = createSelector(
  tasksSelector,
  (state: TasksState) => state.completedTasks,
);

export const currentTaskSelector = createSelector(
  tasksSelector,
  (state: TasksState) => state.currentTask,
);
