import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { storageKeys } from '../global-constants/storage-keys';
import { httpHeader } from '../global-constants/http-headers';

@Injectable()
export class AuthorizationJwtInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem(storageKeys.token);
    let newReq: HttpRequest<any> = req;

    if (token) {
      newReq = newReq.clone({
        headers: newReq.headers
          .append(
            httpHeader.name.authorization,
            `${httpHeader.value.authorization}${token}`
          )
      });
    }

    if (!newReq.headers.has(httpHeader.name.xImg)) {
      newReq = newReq.clone({
        headers: newReq.headers
          .append(httpHeader.name.contentType, httpHeader.value.json),
      });
    }

    return next.handle(newReq);
  }

}
