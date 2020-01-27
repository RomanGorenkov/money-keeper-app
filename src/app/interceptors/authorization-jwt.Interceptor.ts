import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { storageConstants } from '../global-constants/storage-constants';
import { httpHeader } from '../global-constants/http-headers';

@Injectable()
export class AuthorizationJwtInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem(storageConstants.token);
    let newReq: HttpRequest<any> = req;

    if (token) {
      newReq = newReq.clone({
        headers: newReq.headers
          .append(
            httpHeader.httpHeadersName.authorization,
            `${httpHeader.httpHeadersValue.authorization}${token}`
          )
      });
    }

    if (!newReq.headers.has(httpHeader.httpHeadersName.xImg)) {
      newReq = newReq.clone({
        headers: newReq.headers
          .append(httpHeader.httpHeadersName.contentType, httpHeader.httpHeadersValue.json),
      });
    }

    return next.handle(newReq);
  }

}
