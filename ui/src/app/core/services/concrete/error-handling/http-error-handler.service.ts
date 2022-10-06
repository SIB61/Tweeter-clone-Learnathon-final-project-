import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbsHttpErrorHandlerService } from '@core/services/abstract/error-handling/abs-http-error-handler.service';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerService implements AbsHttpErrorHandlerService {
  constructor(private snackbar: MatSnackBar) {}
  handleError(err: HttpErrorResponse): Observable<any> {
    if (err.status == 401) {
      this.snackbar.open('unauthorized', 'ok');
    }
    return throwError(err);
  }
}
