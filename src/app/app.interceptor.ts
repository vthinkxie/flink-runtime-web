import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((res) => {
        const errorMessage = res && res.error && res.error[ 'errors' ] && res.error[ 'errors' ][ 0 ];
        this.injector.get(NzNotificationService).warning('Server Response Error', errorMessage);
        return throwError(res);
      }));
  }
}
