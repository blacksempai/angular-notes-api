import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  hide = true;
  aSub: Subscription;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    });
    this.route.queryParams.subscribe((params: Params)=>{
      if(params['registered']){
        this.snackBar.open('You have successfully created account. Now you can sign in');
      }
      else if(params['accessDenied']){
        this.snackBar.open('Please login or register first');
      }
      else if(params['sessionFailed']){
        this.snackBar.open('Session ended. Please login again');
      }
    });
  }

  ngOnDestroy() {
    if(this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit(){
    this.form.disable();
    this.aSub = this.auth.login(this.form.value).subscribe(
      ()=>{
        this.router.navigate(['/']);
      },
      err => {
        this.snackBar.open(err.error.message);
        console.warn(err);
        this.form.enable();
      });
  }

}
