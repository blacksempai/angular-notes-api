import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private auth: AuthService,
              private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.auth.isAuthenticated()){
      req = req.clone({
        setHeaders: {
          Authorization: this.auth.getToken()
        }
      });
    }
    return next.handle(req).pipe(
      catchError(
          (err: HttpErrorResponse) => this.handleAuthError(err)
        )
    );
  }

  handleAuthError(err: HttpErrorResponse): Observable<any> {
    if(err.status === 401) {
      this.router.navigate(['/login'],{queryParams: {sessionFailed: true}})
    }
    return throwError(err);
  }
}
