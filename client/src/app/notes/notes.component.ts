import { AuthService } from './../shared/services/auth.service';
import { Note } from '../shared/models/note.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {

  @Input() selectedNote: Note;

  constructor(private auth: AuthService) {}

  selectNote(note: Note){
    this.selectedNote = note;
  }

  logout() {
    this.auth.logout();
  }
}
