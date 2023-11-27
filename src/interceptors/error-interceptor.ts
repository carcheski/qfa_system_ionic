import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { StorageService } from "src/services/storage";
 
 
@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storage: StorageService){ }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        console.log("passou")!
        return next.handle(req)
                .pipe(
                    catchError(error => {
                       if( !error.status ){
                            error = JSON.parse(error);
                        }
                        switch(error.status){
                            case 403: this.handle403();
                            break;
                        }
 
                        return throwError(error);
                    })) as any;
    }
 
 
handle403(){
        this.storage.setLocalUser(null as any);
    }
 
}
 
 
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};