import { Note } from '../../shared/models/note.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {

  @Input() note: Note;
  @Output() noteChange = new EventEmitter<Note>();

  open(note: Note) {
    this.note = note;
    this.noteChange.emit(this.note);
  }

}
