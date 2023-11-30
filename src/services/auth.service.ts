import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciaisDTO } from "src/models/credenciais.dto";

@Injectable()
export class AuthService {

    constructor(public http: HttpClient) {
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
}