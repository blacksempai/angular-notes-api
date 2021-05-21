export interface Note {
  _id?: string,
  name: string;
  isFolder: boolean;
  user?: string;
  date?: string;
  parent: string;
  content?: string;
  children?: Note[];
}
