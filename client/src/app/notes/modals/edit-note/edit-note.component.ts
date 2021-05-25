import { Note } from './../../../shared/models/note.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent {

  note: Note;

  constructor(public dialogRef: MatDialogRef<EditNoteComponent>,
    @Inject(MAT_DIALOG_DATA) private originalNote: Note) { }

  ngOnInit(){
    this.note = Object.assign({}, this.originalNote);
  }

}
