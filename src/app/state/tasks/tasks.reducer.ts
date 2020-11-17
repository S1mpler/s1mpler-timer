import { TasksState } from '../models/tasks-state.model';
import { Task } from '@timer/models/task.model';
import { TaskActionType } from './tasks.actions';

// For testing purposes
const initialCompletedTasks: Task[] = [
  {
    title: 'Initial task for testing the date groups',
    project: {
      id: 2,
      name: 'Lolypops Museum Website',
    },
    startedAt: new Date('2020-11-17T14:21:56.567Z'),
    endedAt: new Date(),
  },
  {
    title: 'Initial task for testing the date groups',
    project: {
      id: 5,
      name: 'Sprint Retrospective',
    },
    startedAt: new Date('2020-11-16T11:21:56.567Z'),
    endedAt: new Date('2020-11-16T13:32:01.741Z'),
  },
];

const initialCurrentTask: Task = {
  title: 'Initial task for testing current task',
  project: {
    id: 5,
    name: 'Sprint Retrospective',
  },
  startedAt: new Date(new Date().getTime() - 5000),
  endedAt: null,
};

export const initialState: TasksState = {
  completedTasks: initialCompletedTasks,
  currentTask: null,
};

// Save current state into localStorage
const persist = (state: TasksState): TasksState => {
  localStorage.setItem('tasks', JSON.stringify(state));
  return state;
};

// Load data into the current state from localStorage
const loadState = () => {
  return JSON.parse(localStorage.getItem('tasks')) || initialState;
};

const addTask = (tasks, task) => [task, ...tasks];
const startTask = task =>
  Object.assign(Object.assign({}, task), {
    startedAt: task.endedAt ? new Date() : task.startedAt,
    endedAt: null,
  });

export function tasksReducer(state = initialState, action): TasksState {
  switch (action.type) {
    case TaskActionType.LOAD:
      return loadState();
    case TaskActionType.START:
      return persist({
        completedTasks: state.completedTasks,
        currentTask: startTask(action.payload),
      });
    case TaskActionType.COMPLETE:
      return persist({
        completedTasks: addTask(state.completedTasks, action.payload),
        currentTask: null,
      });
    default:
      return state;
  }
}
