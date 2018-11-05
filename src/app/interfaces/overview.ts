export interface OverviewInterface {
  taskmanagers: number;
  'slots-total': number;
  'slots-available': number;
  'jobs-running': number;
  'jobs-finished': number;
  'jobs-cancelled': number;
  'jobs-failed': number;
  'flink-version': string;
  'flink-commit': string;
}
