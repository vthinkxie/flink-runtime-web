export interface TaskManagerListInterface {
  taskmanagers: TaskmanagersItem[];
}

export interface TaskManagerDetailInterface {
  id: string;
  path: string;
  dataPort: number;
  timeSinceLastHeartbeat: number;
  slotsNumber: number;
  freeSlots: number;
  hardware: Hardware;
  metrics: Metrics;
}

interface TaskmanagersItem {
  id: string;
  path: string;
  dataPort: number;
  timeSinceLastHeartbeat: number;
  slotsNumber: number;
  freeSlots: number;
  hardware: Hardware;
}

interface Hardware {
  cpuCores: number;
  physicalMemory: number;
  freeMemory: number;
  managedMemory: number;
}

interface Metrics {
  heapUsed: number;
  heapCommitted: number;
  heapMax: number;
  nonHeapUsed: number;
  nonHeapCommitted: number;
  nonHeapMax: number;
  directCount: number;
  directUsed: number;
  directMax: number;
  mappedCount: number;
  mappedUsed: number;
  mappedMax: number;
  memorySegmentsAvailable: number;
  memorySegmentsTotal: number;
  garbageCollectors: GarbageCollectorsItem[];
}

interface GarbageCollectorsItem {
  name: string;
  count: number;
  time: number;
}
