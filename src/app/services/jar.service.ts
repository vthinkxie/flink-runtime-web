import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../app.config';
import { JarListInterface, PlanInterface } from 'interfaces';

@Injectable({
  providedIn: 'root'
})
export class JarService {

  loadJarList() {
    return this.httpClient.get<JarListInterface>(`${BASE_URL}/jars`);
  }

  uploadJar(fd) {
    const formData = new FormData();
    formData.append('jarfile', fd, fd.name);
    console.log(formData);
    const req = new HttpRequest('POST', `${BASE_URL}/jars/upload`, formData, {
      reportProgress: true
    });
    return this.httpClient.request(req);
  }

  deleteJar(jarId) {
    return this.httpClient.delete(`${BASE_URL}/jars/${jarId}`);
  }

  runJob(jarId, entryClass, parallelism, programArgs, savepointPath, allowNonRestoredState) {
    const requestParam = { entryClass, parallelism, programArgs, savepointPath, allowNonRestoredState };
    let params = new HttpParams();
    if (entryClass) {
      params = params.append('entry-class', entryClass);
    }
    if (parallelism) {
      params = params.append('parallelism', parallelism);
    }
    if (programArgs) {
      params = params.append('program-args', programArgs);
    }
    if (savepointPath) {
      params = params.append('savepointPath', programArgs);
    }
    if (allowNonRestoredState) {
      params = params.append('allowNonRestoredState', allowNonRestoredState);
    }
    return this.httpClient.post<{ jobid: string }>(`${BASE_URL}/jars/${jarId}/run`, requestParam, { params });
  }

  getPlan(jarId, entryClass, parallelism, programArgs) {
    let params = new HttpParams();
    if (entryClass) {
      params = params.append('entry-class', entryClass);
    }
    if (parallelism) {
      params = params.append('parallelism', parallelism);
    }
    if (programArgs) {
      params = params.append('program-args', programArgs);
    }
    return this.httpClient.get<PlanInterface>(`${BASE_URL}/jars/${jarId}/plan`, {
      params: params
    });
  }

  constructor(private httpClient: HttpClient) {
  }
}
