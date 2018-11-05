import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class JobManagerService {

  loadConfig() {
    return this.httpClient.get<Array<{ key: string; value: string; }>>(`${BASE_URL}/jobmanager/config`);
  }

  loadLogs() {
    return this.httpClient.get(`${BASE_URL}/jobmanager/log`, { responseType: 'text' });
  }

  loadStdout() {
    return this.httpClient.get(`${BASE_URL}/jobmanager/stdout`, { responseType: 'text' });
  }

  constructor(private httpClient: HttpClient) {
  }
}
