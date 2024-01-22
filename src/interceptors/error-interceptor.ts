import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { StorageService } from "src/services/storage.service";
import { LocalUser } from "src/models/local_user";
import { AlertController } from "@ionic/angular";
import { FieldMessage } from "src/models/fieldmessage";
import { STORAGE_KEYS } from "src/config/storage_keys.config";
 
 
@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(
        public storage: StorageService, 
        public alertCtrl: AlertController) {
    }

 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req)
                .pipe(
                    catchError(error => {
                       let errorObj = error;
                       if (errorObj.error) {
                            errorObj = errorObj.error;
                        }
                       if( !error.status ){
                            error = JSON.parse(error);
                        }
                        switch(error.status){

                            case 401:
                                this.handle401();
                                break;
                            
                            case 403:
                                this.handle403();
                                break;

                            case 422:
                                this.handle422(errorObj);
                                break;

                            default:
                            this.handleDefaultError(errorObj);
                        }
 
                        return throwError(error);
                    })) as any;
    }
 
 
handle403(){
    localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(null));
}

handle401() {
    let alert = this.alertCtrl.create({
        header: 'Erro 401: falha de autenticação',
        message: 'Email ou senha incorretos',
        backdropDismiss: false,
        buttons: [
            {
                text: 'Ok'
            }
        ]
    });
    alert.finally;
}

handle422(errorObj: any) {
    let alert = this.alertCtrl.create({
        header: 'Erro 422: Validação',
        message: this.listErrors(errorObj.errors),
        backdropDismiss: false,
        buttons: [
            {
                text: 'Ok'
            }
        ]
    });
    alert.finally();
}

handleDefaultError(errorObj: any) {
    let alert = this.alertCtrl.create({
        header: 'Erro ' + errorObj.status + ': ' + errorObj.error,
        message: errorObj.message,
        backdropDismiss: false,
        buttons: [
            {
                text: 'Ok'
            }
        ]
    });
    alert.finally();        
}

private listErrors(messages : FieldMessage[]) : string {
    let s : string = '';
    for (var i=0; i<messages.length; i++) {
        s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
    }
    return s;
}
}
 
 
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};