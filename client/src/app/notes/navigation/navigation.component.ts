import { Note } from './../../shared/models/note.model';
import { NoteService } from '../../shared/services/note.service';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Output, EventEmitter } from '@angular/core';


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
  selectedNote: Note;

  noteSelect(note: Note) {
    this.selectedNote = note;
    this.noteSelectedEvent.emit(this.selectedNote);
  }

  treeControl: NestedTreeControl<Note>;
  dataSource: MatTreeNestedDataSource<Note>;

  constructor(private noteService: NoteService) {
    this.treeControl = new NestedTreeControl(note => note.children);
    this.dataSource = new MatTreeNestedDataSource();
    this.noteService.getNotes().subscribe(data =>{
      this.dataSource.data = data;
    });
  }

  hasChild = (_: number, node: Note) => !!node.children && node.children.length > 0;
}
