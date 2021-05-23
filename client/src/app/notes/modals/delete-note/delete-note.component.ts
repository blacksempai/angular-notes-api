import { Note } from './../../../shared/models/note.model';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-note',
  templateUrl: './delete-note.component.html',
  styleUrls: ['./delete-note.component.scss']
})
export class DeleteNoteComponent{


  constructor(public dialogRef: MatDialogRef<DeleteNoteComponent>,
              @Inject(MAT_DIALOG_DATA) public note: Note) { }


  close(): void {
    this.dialogRef.close();
  }

}
