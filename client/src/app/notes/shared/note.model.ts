export interface Note {
  _id?: string,
  name: string;
  isFolder: boolean;
  user?: string;
  parent: string;
  content?: string;
  children?: Note[];
}
