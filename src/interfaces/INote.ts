export interface INote {
    _id?: String,
    name: String;
    isFolder: Boolean;
    user?: String;
    date?: String;
    parent: String;
    content?: String;
    children?: Array<INote | String>;
  }