import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { BASE_URL } from '../app.config';
import { JobBackpressureInterface, JobOverviewInterface, JobsItemInterface } from 'interfaces';
import {
  CheckPointInterface,
  CheckPointConfigInterface,
  CheckPointDetailInterface,
  CheckPointSubTaskInterface,
  JobExceptionInterface,
  JobConfigInterface,
  JobDetailInterface,
  JobDetailCorrectInterface,
  JobSubTaskTimeInterface,
  VerticesItemInterface,
  JobVertexTaskManagerInterface,
  VertexTaskManagerDetailInterface,
  JobSubTaskInterface
} from 'interfaces';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  jobDetail: JobDetailCorrectInterface;
  jobDetail$ = new Subject<JobDetailCorrectInterface>();

  constructor(private httpClient: HttpClient) {
  }

  cancelJob(jobId) {
    return this.httpClient.get(`${BASE_URL}/jobs/${jobId}/yarn-cancel`);
  }

  stopJob(jobId) {
    return this.httpClient.get(`${BASE_URL}/jobs/${jobId}/yarn-stop`);
  }

  loadJobs() {
    return this.httpClient.get<JobOverviewInterface>(`${BASE_URL}/jobs/overview`).pipe(
      map(data => {
        data.jobs.forEach(job => {
          for (const key in job.tasks) {
            const upperCaseKey = key.toUpperCase();
            job.tasks[ upperCaseKey ] = job.tasks[ key ];
            delete job.tasks[ key ];
          }
          job.completed = [ 'FINISHED', 'FAILED', 'CANCELED' ].indexOf(job.state) > -1;
          this.setEndTimes(job);
        });
        return data.jobs || [];
      })
    );
  }

  loadJobConfig(jobId) {
    return this.httpClient.get<JobConfigInterface>(`${BASE_URL}/jobs/${jobId}/config`);
  }

  loadJob(jobId) {
    return this.httpClient.get<JobDetailInterface>(`${BASE_URL}/jobs/${jobId}`).pipe(
      map(job => this.convertJob(job))
    );
  }

  loadAccumulators(jobId, vertexId) {
    return this.httpClient.get(`${BASE_URL}/jobs/${jobId}/vertices/${vertexId}/accumulators`).pipe(flatMap(data => {
      const accumulators = data[ 'user-accumulators' ];
      return this.httpClient.get(`${BASE_URL}/jobs/${jobId}/vertices/${vertexId}/subtasks/accumulators`).pipe(map(item => {
        const subtaskAccumulators = item[ 'subtasks' ];
        return {
          main    : accumulators,
          subtasks: subtaskAccumulators
        };
      }));
    }));
  }

  loadExceptions(jobId) {
    return this.httpClient.get<JobExceptionInterface>(`${BASE_URL}/jobs/${jobId}/exceptions`);
  }

  loadOperatorBackPressure(jobId, vertexId) {
    return this.httpClient.get<JobBackpressureInterface>(`${BASE_URL}/jobs/${jobId}/vertices/${vertexId}/backpressure`);
  }

  loadSubTasks(jobId, vertexId) {
    return this.httpClient.get<{ subtasks: JobSubTaskInterface[] }>(`${BASE_URL}/jobs/${jobId}/vertices/${vertexId}`).pipe(map(
      item => {
        item.subtasks.forEach(task => this.setEndTimes(task));
        return item.subtasks;
      }
    ));
  }

  loadSubTaskTimes(jobId, vertexId) {
    return this.httpClient.get<JobSubTaskTimeInterface>(`${BASE_URL}/jobs/${jobId}/vertices/${vertexId}/subtasktimes`);
  }

  loadTaskManagers(jobId, vertexId) {
    return this.httpClient.get<JobVertexTaskManagerInterface>(
      `${BASE_URL}/jobs/${jobId}/vertices/${vertexId}/taskmanagers`
    ).pipe(map(item => {
      if (item.taskmanagers) {
        item.taskmanagers.forEach(taskManager => {
          this.setEndTimes(taskManager);
        });
      }
      return item;
    }));
  }


  loadCheckpointStats(jobId) {
    return this.httpClient.get<CheckPointInterface>(`${BASE_URL}/jobs/${jobId}/checkpoints`);
  }

  loadCheckpointConfig(jobId) {
    return this.httpClient.get<CheckPointConfigInterface>(`${BASE_URL}/jobs/${jobId}/checkpoints/config`);
  }

  loadCheckpointDetails(jobId, checkPointId) {
    return this.httpClient.get<CheckPointDetailInterface>(`${BASE_URL}/jobs/${jobId}/checkpoints/details/${checkPointId}`);
  }

  loadCheckpointSubtaskDetails(jobId, checkPointId, vertexId) {
    return this.httpClient.get<CheckPointSubTaskInterface>(
      `${BASE_URL}/jobs/${jobId}/checkpoints/details/${checkPointId}/subtasks/${vertexId}`
    );
  }

  private convertJob(job: JobDetailInterface): JobDetailCorrectInterface {
    const links = [];
    if (job.vertices) {
      job.vertices.forEach(vertex => this.setEndTimes(vertex));
    }
    if (job.plan.nodes.length) {
      job.plan.nodes.forEach(node => {
        let detail = {} as VerticesItemInterface;
        if (job.vertices && job.vertices.length) {
          detail = job.vertices.find(vertex => {
            return vertex.id === node.id;
          });
        }
        node[ 'detail' ] = detail;
        if (node.inputs && node.inputs.length) {
          node.inputs.forEach(input => {
            links.push({ ...input, source: input.id, target: node.id, id: `${input.id}-${node.id}` });
          });
        }
      });
    }
    job.plan[ 'links' ] = links;
    return job as JobDetailCorrectInterface;
  }

  private setEndTimes(item: JobsItemInterface | VerticesItemInterface | JobSubTaskInterface | VertexTaskManagerDetailInterface) {
    if (item[ 'end-time' ] <= -1) {
      item[ 'end-time' ] = (item[ 'start-time' ] || item[ 'start_time' ]) + item.duration;
    }
  }
}
