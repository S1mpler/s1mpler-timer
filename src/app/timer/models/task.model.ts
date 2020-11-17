import { Project } from './project.model';

export interface Task {
  title: string;
  project: Project;
  startedAt: Date;
  endedAt: Date;
}
