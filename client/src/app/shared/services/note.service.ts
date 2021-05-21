import { AuthService } from './auth.service';
import { Note } from '../models/note.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  getNotes(){
    return this.http.get<Note[]>('/api/note');
  }
}