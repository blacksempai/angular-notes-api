import { Note } from './note.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  getNotes(){
    return this.http.get<Note[]>('http://127.0.0.1:3000/api/note',{
    headers: {
      "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlbmphbWluZnJhbmNsaW4xOTk4QGdtYWlsLmNvbSIsInVzZXJJZCI6IjYwOTJhNGQ2MzlhZmM4MzhlY2Y4NDQ3YSIsImlhdCI6MTYyMDg5ODIxNSwiZXhwIjoxNjIwOTAxODE1fQ.YqVTONDoU_SbegKptsZ6nKWtoZd3vfUk9BtKGNzfbJ4"
    }
  });
  }
}
