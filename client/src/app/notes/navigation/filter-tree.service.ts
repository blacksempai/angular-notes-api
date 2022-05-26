import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from './../../shared/models/note.model';
import { NoteService } from './../../shared/services/note.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterTreeService {
  private dataChange: BehaviorSubject<Note[]>;
  private treeData: Note[];

  private isfilterByContent = false;

  constructor(private noteService: NoteService, public snackBar: MatSnackBar) {
    this.dataChange = new BehaviorSubject<Note[]>([]);
    this.noteService.getNotes().subscribe(data =>{
      this.treeData = data;
      this.dataChange.next(this.treeData);
    });
  }

  getTree() {
    return this.dataChange.pipe(
      map(notes => this.buildTree(notes, 'root'))
    )
  }

  create(note: Note) {
    this.noteService.create(note).subscribe(newNote => {
      this.treeData.push(newNote);
      this.dataChange.next(this.treeData);
    },
    err => this.snackBar.open("Note has not been updated due to server error. Name of file is not unique or parent folder has been deleted"))
  }

  update(note: Note) {
    this.noteService.update(note).subscribe(newNote => {
      const updatedNoteIndex = this.treeData.findIndex(n => n._id === newNote._id);
      this.treeData[updatedNoteIndex] = newNote;
      this.dataChange.next(this.treeData);
    },
    err => this.snackBar.open("Note has not been created due to server error. Name of file is not unique or parent folder has been deleted"))
  }

  delete(note: Note) {
    this.noteService.delete(note).subscribe(response => {
      console.log("here");
      this.treeData = this.treeData.filter(n => n._id !== note._id)
      this.dataChange.next(this.treeData);
      this.snackBar.open(response.message);
    },
    err => this.snackBar.open("Note has not been deleted due to server error"))
  }

  public filter(filterText: string) {
    if(this.treeData){ // If data is fetched
      let filteredTreeData;
      if (filterText) { // If filter text is not empty
        if(this.isfilterByContent){
          filteredTreeData = this.treeData.filter(d => d.content.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1); // filter array of notes for content match
        }
        else {
          filteredTreeData = this.treeData.filter(d => d.name.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1); // filter array of notes for name match
        }
        Object.assign([], filteredTreeData).forEach(ftd => {
          let str = (<string>ftd.path);
          while (str.lastIndexOf('/') > -1) {  //while path is not empty
            const index = str.lastIndexOf('/');
            str = str.substring(0, index); // cut last '/' symbol
            const nameStartIndex = str.lastIndexOf('/') + 1; // index of first symbol of parrent folder name in path
            if (filteredTreeData.findIndex(t => t.name === str.substring(nameStartIndex)) === -1) { //if this folder is not in an array already
              const obj = this.treeData.find(d => d.name === str.substring(nameStartIndex)); // find this folder
              if (obj) {
                filteredTreeData.push(obj);
              }
            }
          }
        });
      } else {
        filteredTreeData = this.treeData;
      }
      this.dataChange.next(filteredTreeData);
    }
  }

  setFilterByContent(value: boolean) {
    this.isfilterByContent = value;
  }

  private buildTree(notes: Note[], level: string): Note[] {
    return notes.filter(n =>
      (<string>n.path).startsWith(level + '/')
      && (n.path.match(/\//g) || []).length === (level.match(/\//g) || []).length + 1
    )
      .map(note => {
        if(note.isFolder) {
          const children = notes.filter(so => (<string>so.path).startsWith(level + '/'));
          if (children && children.length > 0) {
            note.children = this.buildTree(children, note.path + note.name);
          }
        }
        return note;
      });
  }

}
