import { Task } from './task.model';

export interface TaskGroup {
  date: Date;
  tasks: Task[];
}
