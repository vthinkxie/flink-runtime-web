export interface JarListInterface {
  address: string;
  files: FilesItem[];
}

interface FilesItem {
  id: string;
  name: string;
  uploaded: number;
  entry: EntryItem[];
}

interface EntryItem {
  name: string;
  description: null;
}
