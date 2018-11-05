export interface JobConfigInterface {
  'jid': string;
  'name': string;
  'execution-config': {
    'execution-mode': string;
    'restart-strategy': string;
    'job-parallelism': number;
    'object-reuse-mode': boolean;
    'user-config': {
      [ key: string ]: string;
    }
  };
}
