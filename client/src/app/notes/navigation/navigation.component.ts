import { NoteService } from './../shared/note.service';
import { Note } from './../shared/note.model';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
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

  noteSelect(note: Note) {
    this.noteSelectedEvent.emit(note);
  }

  treeControl: FlatTreeControl<FlatTreeNode>;
  treeFlattener: MatTreeFlattener<Note, FlatTreeNode>;
  dataSource: MatTreeFlatDataSource<Note, FlatTreeNode>;

  constructor(private noteService: NoteService) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.noteService.getNotes().subscribe(data =>{
      this.dataSource.data = data;
    });
  }

  transformer(node: Note, level: number): FlatTreeNode {
    return {
      name: node.name,
      isFolder: node.isFolder,
      content: node.content,
      level,
      expandable: !!node.children
    };
  }

  getLevel(node: FlatTreeNode): number {
    return node.level;
  }

  isExpandable(node: FlatTreeNode): boolean {
    return node.expandable;
  }

  hasChild(index: number, node: FlatTreeNode): boolean {
    return node.expandable;
  }

  getChildren(node: Note): Note[] | null | undefined {
    return node.children;
  }
}
