export interface JobOverviewInterface {
  jobs: JobsItemInterface[];
}

export interface JobsItemInterface {
  jid: string;
  name: string;
  state: string;
  'start-time': number;
  'end-time': number;
  duration: number;
  'last-modification': number;
  tasks: TaskStatusInterface;
  completed?: boolean;
}

export interface TaskStatusInterface {
  'CANCELED': number;
  'CANCELING': number;
  'CREATED': number;
  'DEPLOYING': number;
  'FAILED': number;
  'FINISHED': number;
  'RECONCILING': number;
  'RUNNING': number;
  'SCHEDULED': number;
  'TOTAL': number;
}
