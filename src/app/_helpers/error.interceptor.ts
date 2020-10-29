import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      if([401, 403].includes(err.status) && this.authService.userValue) {
        // auto logout if 401 or 403 response returned from api
        this.authService.logout();
      }

      const error = (err && err.error && err.error.message) || err.statusText;
      return throwError(error);
    }))
  }
}
