export interface JobSubTaskInterface {
  'attempt': number;
  'duration': number;
  'end-time': number;
  'host': string;
  'start_time': number;
  'status': string;
  'subtask': number;
  'metrics': {
    'read-bytes': number;
    'read-bytes-complete': boolean;
    'read-records': number
    'read-records-complete': boolean;
    'write-bytes': number;
    'write-bytes-complete': boolean;
    'write-records': number;
    'write-records-complete': boolean;
  };
}
