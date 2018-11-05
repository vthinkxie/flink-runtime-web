export interface JobVertexTaskManagerInterface {
  'id': string;
  'name': string;
  'now': number;
  'taskmanagers': Array<VertexTaskManagerDetailInterface>;
}

export interface VertexTaskManagerDetailInterface {
  'host': string;
  'status': string;
  'start-time': number;
  'end-time': number;
  'duration': number;
  'metrics': {
    'read-bytes': number;
    'read-bytes-complete': boolean;
    'write-bytes': number;
    'write-bytes-complete': boolean;
    'read-records': number;
    'read-records-complete': boolean;
    'write-records': number;
    'write-records-complete': boolean;
  };
  'status-counts': {
    CANCELED: number;
    CANCELING: number;
    CREATED: number;
    DEPLOYING: number;
    FAILED: number;
    FINISHED: number;
    RECONCILING: number;
    RUNNING: number;
    SCHEDULED: number;
  };
}

