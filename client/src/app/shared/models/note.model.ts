import { User } from './user.model';

export interface Note {
  _id?: string,
  name: string;
  isFolder: boolean;
  user?: User;
  date: string;
  parent: string;
  content?: string;
  children?: Note[];
}
