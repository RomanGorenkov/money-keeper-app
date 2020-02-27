import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router'

import { roads } from '../global-constants/roads'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Chet')
    return next.handle(req).pipe(
      catchError(err => {
        const error = err.error.message || err.statusText

        if (err.status === 401) {
          this.logout()
        }
        return throwError(error)
      })
    )
  }

  logout() {
    localStorage.clear()
    this.router.navigate([roads.authorisation.login])
  }
}
