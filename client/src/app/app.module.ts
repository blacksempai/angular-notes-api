import { DeleteNoteComponent } from './notes/modals/delete-note/delete-note.component';
import { EditNoteComponent } from './notes/modals/edit-note/edit-note.component';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { NoteComponent } from './notes/note/note.component';
import { NavigationComponent } from './notes/navigation/navigation.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { CreateNoteComponent } from './notes/modals/create-note/create-note.component';
import { FilterSpecSymbolDirective } from './shared/directives/filter-spec-symbol.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NoteComponent,
    NotesComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    CreateNoteComponent,
    EditNoteComponent,
    DeleteNoteComponent,
    FilterSpecSymbolDirective
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
