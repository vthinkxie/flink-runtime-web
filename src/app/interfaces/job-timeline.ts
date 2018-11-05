export interface JobSubTaskTimeInterface {
  'id': string;
  'name': string;
  'now': number;
  'subtasks': Array<{
    'subtask': number;
    'host': string;
    'duration': number;
    'timestamps': {
      'CREATED': number;
      'RUNNING': number;
      'FAILING': number;
      'RECONCILING': number;
      'CANCELLING': number;
      'RESTARTING': number;
      'FINISHED': number;
      'FAILED': number;
      'CANCELED': number;
      'SUSPENDED': number;
    }
  }>;
}
