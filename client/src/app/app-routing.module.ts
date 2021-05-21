import { AuthGuard } from './shared/classes/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  {path: '', component: NotesComponent, canActivate: [AuthGuard]},
  {path: '', component: AuthComponent, children: [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
