import { FormControl } from '@angular/forms';
import { FilterTreeService } from './filter-tree.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditNoteComponent } from './../modals/edit-note/edit-note.component';
import { DeleteNoteComponent } from './../modals/delete-note/delete-note.component';
import { Note } from './../../shared/models/note.model';
import { NoteService } from '../../shared/services/note.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateNoteComponent } from '../modals/create-note/create-note.component';
import { Subscription } from 'rxjs';


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
export class NavigationComponent implements OnInit, OnDestroy {

  @Output() noteSelectedEvent = new EventEmitter<Note>();
  @Input() selectedNote: Note;

  treeControl: NestedTreeControl<Note>;
  dataSource: MatTreeNestedDataSource<Note>;
  treeSub: Subscription;
  filterField: FormControl;

  constructor(public dialog: MatDialog, private treeService: FilterTreeService) { }

  ngOnInit(){
    this.treeControl = new NestedTreeControl(note => note.children);
    this.dataSource = new MatTreeNestedDataSource();
    this.filterField = new FormControl();

    this.treeSub = this.treeService.getTree().subscribe(data =>{
      this.dataSource.data = null;
      this.dataSource.data = data;
      this.treeControl.dataNodes = data;
    });
  }

  ngOnDestroy(){
    this.treeSub.unsubscribe();
  }

  noteSelect(note: Note) {
    this.selectedNote = note;
    this.noteSelectedEvent.emit(this.selectedNote);
  }

  hasChild = (_: number, node: Note) => !!node.children && node.children.length > 0;

  filterChanged() {
    this.treeService.filter(this.filterField.value);
    this.treeControl.expandAll();
  }

  setFilterByName() {
    this.treeService.setFilterByContent(false);
    this.filterChanged();
  }

  setFilterByContent() {
    this.treeService.setFilterByContent(true);
    this.filterChanged();
  }

  openCreateDialog(path: string, isFolder: boolean): void {
    const dialogRef = this.dialog.open(CreateNoteComponent, {
      width: '80%',
      data: {
        isFolder: isFolder,
        path: path
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.treeService.create(result);
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
        if(this.selectedNote == note) this.noteSelectedEvent.next(null);
        this.treeService.update(result);
      }
    });
  }

  openDeleteDialog(note: Note): void {
    const dialogRef = this.dialog.open(DeleteNoteComponent, {
      width: '50%',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(this.selectedNote == note) this.noteSelectedEvent.next(null);
        this.treeService.delete(note);
      }
    });
  }
}
