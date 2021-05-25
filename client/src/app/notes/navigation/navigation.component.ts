import { MatSnackBar } from '@angular/material/snack-bar';
import { EditNoteComponent } from './../modals/edit-note/edit-note.component';
import { DeleteNoteComponent } from './../modals/delete-note/delete-note.component';
import { Note } from './../../shared/models/note.model';
import { NoteService } from '../../shared/services/note.service';
import { Component, Input } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateNoteComponent } from '../modals/create-note/create-note.component';


export interface FlatTreeNode {
  name: string;
  isFolder: boolean;
  content: string,
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @Output() noteSelectedEvent = new EventEmitter<Note>();
  @Input() selectedNote: Note;

  noteSelect(note: Note) {
    this.selectedNote = note;
    this.noteSelectedEvent.emit(this.selectedNote);
  }

  treeControl: NestedTreeControl<Note>;
  dataSource: MatTreeNestedDataSource<Note>;

  constructor(private noteService: NoteService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.treeControl = new NestedTreeControl(note => note.children);
    this.dataSource = new MatTreeNestedDataSource();
    this.noteService.getNotes().subscribe(data =>{
      this.dataSource.data = data;
    });
  }

  hasChild = (_: number, node: Note) => !!node.children && node.children.length > 0;

  openCreateNoteDialog(parent: Note) {
    this.openCreateDialog(parent, false);
  }

  openCreateFolderDialog(parent: Note) {
    this.openCreateDialog(parent, true);
  }

  private openCreateDialog(parent: Note, isFolder: boolean): void {
    const dialogRef = this.dialog.open(CreateNoteComponent, {
      width: '80%',
      data: {
        isFolder: isFolder,
        parent: parent
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.noteService.create(result).subscribe((r)=>{
          if(r) {
            if(r.parent == null){
              this.dataSource.data.push(r);
              console.log(this.dataSource.data);
            }
            else {
              parent.children.push(r);
            }
          }
        });
      }
    });
  }

  openEditDialog(note: Note): void {
    const dialogRef = this.dialog.open(EditNoteComponent, {
      width: '80%',
      data: note
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.noteService.update(result).subscribe((r)=>{
          if(r){
            console.log(r);
            note = r;
            this.treeControl.collapseAll();
          }
        });
      }
    });
  }

  openDeleteDialog(note: Note): void {
    const dialogRef = this.dialog.open(DeleteNoteComponent, {
      width: '80%',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.noteService.delete(note).subscribe((response)=>{
          if(response){

            this.snackBar.open(response.message);
          }
        });
      }
    });
  }
}
