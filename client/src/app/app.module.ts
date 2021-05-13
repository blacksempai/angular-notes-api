import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { NoteComponent } from './notes/note/note.component';
import { NavigationComponent } from './notes/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NoteComponent,
    NotesComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
