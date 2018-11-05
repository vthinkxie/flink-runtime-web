export interface CheckPointInterface {
  counts: {
    'restored': number;
    'total': number;
    'in_progress': number;
    'completed': number;
    'failed': number
  };
  summary: {
    'state_size': CheckPointMinMaxAvgStatisticsInterface;
    'end_to_end_duration': CheckPointMinMaxAvgStatisticsInterface;
    'alignment_buffered': CheckPointMinMaxAvgStatisticsInterface;
  };
  latest: {
    completed: CheckPointCompletedStatisticsInterface;
    savepoint: CheckPointCompletedStatisticsInterface;
    failed: {
      'id': number;
      'status': string;
      'is_savepoint': boolean;
      'trigger_timestamp': number;
      'latest_ack_timestamp': number;
      'state_size': number;
      'end_to_end_duration': number;
      'alignment_buffered': number;
      'num_subtasks': number;
      'num_acknowledged_subtasks': number;
      'failure_timestamp': number;
      'failure_message': string;
      task: CheckPointTaskStatisticsInterface;
    };
    restored: {
      'id': number;
      'restore_timestamp': number;
      'is_savepoint': boolean;
      'external_path': string;
    };
    history: {
      'id': number;
      'status': string;
      'is_savepoint': boolean;
      'trigger_timestamp': number;
      'latest_ack_timestamp': number;
      'state_size': number;
      'end_to_end_duration': number;
      'alignment_buffered': number;
      'num_subtasks': number;
      'num_acknowledged_subtasks': number;
      task: CheckPointTaskStatisticsInterface;
    }
  };
}

export interface CheckPointMinMaxAvgStatisticsInterface {
  'min': number;
  'max': number;
  'avg': number;
}

export interface CheckPointCompletedStatisticsInterface {
  'id': number;
  'status': string;
  'is_savepoint': boolean;
  'trigger_timestamp': number;
  'latest_ack_timestamp': number;
  'state_size': number;
  'end_to_end_duration': number;
  'alignment_buffered': number;
  'num_subtasks': number;
  'num_acknowledged_subtasks': number;
  tasks: CheckPointTaskStatisticsInterface;
  external_path: string;
  discarded: boolean;
}

export interface CheckPointTaskStatisticsInterface {
  'id': number;
  'status': string;
  'latest_ack_timestamp': number;
  'state_size': number;
  'end_to_end_duration': number;
  'alignment_buffered': number;
  'num_subtasks': number;
  'num_acknowledged_subtasks': number;
}

export interface CheckPointConfigInterface {
  'mode': any;
  'interval': number;
  'timeout': number;
  'min_pause': number;
  'max_concurrent': number;
  'externalization': {
    'enabled': boolean;
    'delete_on_cancellation': boolean;
  };
}

export interface CheckPointDetailInterface {
  'id': number;
  'status': string;
  'is_savepoint': boolean;
  'trigger_timestamp': number;
  'latest_ack_timestamp': number;
  'state_size': number;
  'end_to_end_duration': number;
  'alignment_buffered': number;
  'num_subtasks': number;
  'num_acknowledged_subtasks': number;
  'tasks': Array<{
    [ taskId: string ]: {
      'id': number;
      'status': string;
      'latest_ack_timestamp': number;
      'state_size': number;
      'end_to_end_duration': number;
      'alignment_buffered': number;
      'num_subtasks': number;
      'num_acknowledged_subtasks': number;
    }
  }>;
}

export interface CheckPointSubTaskInterface {
  'id': number;
  'status': string;
  'latest_ack_timestamp': number;
  'state_size': number;
  'end_to_end_duration': number;
  'alignment_buffered': number;
  'num_subtasks': number;
  'num_acknowledged_subtasks': number;
  'summary': {
    'state_size': CheckPointMinMaxAvgStatisticsInterface;
    'end_to_end_duration': CheckPointMinMaxAvgStatisticsInterface;
    'checkpoint_duration': {
      'sync': CheckPointMinMaxAvgStatisticsInterface
      'async': CheckPointMinMaxAvgStatisticsInterface
    },
    'alignment': {
      'buffered': CheckPointMinMaxAvgStatisticsInterface
      'duration': CheckPointMinMaxAvgStatisticsInterface
    }
  };
  'subtasks': Array<{
    'index': number;
    'status': string;
  }>;
}
