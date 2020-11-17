import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../models/project.model';
import { projectList } from '../utils/config';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  /**
   * Returns an observable of a project list.
   * Uses mock data.
   */
  public getProjectList(): Observable<Project[]> {
    return of(projectList);
  }
}
