export interface JobBackpressureInterface {
  status: string;
  'backpressure-level': string;
  'end-timestamp': number;
  subtasks: SubtasksItem[];
}

interface SubtasksItem {
  subtask: number;
  'backpressure-level': string;
  ratio: number;
}
