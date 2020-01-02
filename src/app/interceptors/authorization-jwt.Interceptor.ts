import {HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { storageConstants } from '../global-constants/storage-constants';

export class AuthorizationJwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const newReq = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${localStorage.getItem(storageConstants.token)}`)
        .set('Content-Type', 'application/json'),
    });
    return next.handle(newReq);
  }
}
