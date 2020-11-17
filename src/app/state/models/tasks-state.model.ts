import { Task } from '@timer/models/task.model';

export interface TasksState {
  completedTasks: Task[];
  currentTask: Task;
}
