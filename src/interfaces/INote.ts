export interface INote {
    _id?: String,
    name: String;
    isFolder: Boolean;
    user?: String;
    date?: String;
    content?: String;
    path: String;
  }