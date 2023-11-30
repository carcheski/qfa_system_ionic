import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciaisDTO } from "src/models/credenciais.dto";
import { LocalUser } from "src/models/local_user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService {

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }

    authenticate(creds : CredenciaisDTO) {
        return this.http.post(
            `/auth/login`, 
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(body : string) {
        let tok = body.substring(17);
        let user : LocalUser = {
            token: tok
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null as any);
    }
}