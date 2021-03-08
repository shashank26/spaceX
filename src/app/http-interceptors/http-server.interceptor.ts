import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";


@Injectable()
export class HttpServerInterceptor implements HttpInterceptor {

    constructor(private transferState: TransferState) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.transferState.set(makeStateKey(req.url), event.body);
                }
            })
        );
    }

}