import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class AbsHttpErrorHandlerService {
  abstract handleError(err: HttpErrorResponse): Observable<any>;
}
