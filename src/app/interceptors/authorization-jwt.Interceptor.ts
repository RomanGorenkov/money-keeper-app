import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { storageConstants } from '../global-constants/storage-constants';
import { httpHeader } from '../global-constants/http-headers';

export class AuthorizationJwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let newReq = req.clone({
      headers: req.headers
        .set(
          httpHeader.httpHeadersName.authorization,
          `${httpHeader.httpHeadersValue.authorization}${localStorage.getItem(storageConstants.token)}`
        )
    });

    if (!req.headers.has(httpHeader.httpHeadersName.xImg)) {
      newReq = newReq.clone({
        headers: newReq.headers
          .set(httpHeader.httpHeadersName.contentType, httpHeader.httpHeadersValue.json),
      });
      return next.handle(newReq);
    }

    return next.handle(newReq);
  }
}
