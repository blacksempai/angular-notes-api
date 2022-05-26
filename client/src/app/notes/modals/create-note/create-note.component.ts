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
              @Inject(MAT_DIALOG_DATA) public data : {isFolder: boolean, path: string}) { }

  ngOnInit(){
    this.note = {
      path: this.data.path,
      isFolder: this.data.isFolder,
      name: '',
      content: ''
    }
  }

}
