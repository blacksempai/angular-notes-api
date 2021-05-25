import { Note } from './../../../shared/models/note.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  note: Note;

  constructor(public dialogRef: MatDialogRef<CreateNoteComponent>,
              @Inject(MAT_DIALOG_DATA) public data : {isFolder: boolean, parent: Note}) { }

  ngOnInit(){
    this.note = {
      parent: this.data.parent ? this.data.parent._id : null,
      isFolder: this.data.isFolder,
      name: '',
      content: ''
    }
  }
}
