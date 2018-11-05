import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BASE_URL } from '../app.config';
import { TaskManagerListInterface, TaskManagerDetailInterface } from 'interfaces';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  taskManagerDetail: TaskManagerDetailInterface;
  taskManagerDetail$ = new Subject<TaskManagerDetailInterface>();

  loadManagers() {
    return this.httpClient.get<TaskManagerListInterface>(`${BASE_URL}/taskmanagers`).pipe(map(data => data.taskmanagers || []));
  }

  loadManager(taskManagerId) {
    return this.httpClient.get<TaskManagerDetailInterface>(`${BASE_URL}/taskmanagers/${taskManagerId}`);
  }

  loadLogs(taskManagerId) {
    return this.httpClient.get(`${BASE_URL}/taskmanagers/${taskManagerId}/log`, { responseType: 'text' });
  }

  loadStdout(taskManagerId) {
    return this.httpClient.get(`${BASE_URL}/taskmanagers/${taskManagerId}/stdout`, { responseType: 'text' });
  }

  constructor(private httpClient: HttpClient) {
  }
}
