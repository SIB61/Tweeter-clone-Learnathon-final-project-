import { HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpErrorHandlerService } from '@core/services/concrete/error-handling/http-error-handler.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  useClass:HttpErrorHandlerService
})
export abstract class AbsHttpErrorHandlerService {
  abstract handleError(req: HttpRequest<any>,next:HttpHandler,err: HttpErrorResponse): Observable<any>;
}
