import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

export class AuthorizationJwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const newReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${window.localStorage.getItem('token')}`).set('Content-Type', 'application/json'),
    });
    return next.handle(newReq);

  }
}
