import { Note } from '../shared/models/note.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  selectedNote: Note;

  selectNote(note: Note){
    this.selectedNote = note;
  }

  constructor() { }

  ngOnInit() {
  }

}
