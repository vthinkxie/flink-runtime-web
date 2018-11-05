export interface JobExceptionInterface {
  'root-exception': string;
  timestamp: number;
  truncated: boolean;
  'all-exceptions': Array<{
    'attempt-num': number;
    'exception': string;
    'location': string;
    'subtask-index': number;
    'task': string;
    'timestamp': number;
    'vertex-id': string;
  }>;
}
