import { NodesItemInterface } from './job-detail';

export interface PlanInterface {
  'plan': {
    jid: string;
    name: string;
    nodes: NodesItemInterface[];
  };
}
