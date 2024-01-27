import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciaisDTO } from "src/models/credenciais.dto";
import { LocalUser } from "src/models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { API_CONFIG } from "src/config/api.config";
import { CartService } from "./domain/cart.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

    jwtDecode: JwtHelperService = new JwtHelperService();

    constructor(
        public http: HttpClient,
        public storage: StorageService,
        public cartService: CartService
        ) {
    }

    authenticate(creds : CredenciaisDTO) {
        console.log('1');
        console.log(this.storage.getLocalUser());
        console.log(creds);
        if(this.storage.getLocalUser() != null){
            console.log('2');
            this.logout();
        }
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/login`, 
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    refreshToken() {
        console.log("login", localStorage.getItem("localUser"));
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(body : string) {
        console.log('Passou aqui');
        let tok = body.substring(17);
        let user : LocalUser = {
            token: tok,
            login: this.jwtDecode.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
        this.cartService.createOrClearCart();
    }

    logout() {
        this.storage.setLocalUser(null as any);
    }
}