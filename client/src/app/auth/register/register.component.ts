import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  hide = true;
  aSub: Subscription;

  constructor(private auth: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    });
  }

  ngOnDestroy() {
    if(this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit(){
    this.form.disable();
    this.aSub = this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'],{queryParams: {registered: true}});
      },
      err => {
        this.snackBar.open(err.error.message);
        console.warn(err);
        this.form.enable();
      }
    );
  }
}
