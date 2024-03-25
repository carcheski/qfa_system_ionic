import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Observable } from "rxjs";
import { UsuarioDTO } from "src/models/usuario.dto";
import { API_CONFIG } from "src/config/api.config";
import { UserDTO } from "src/models/user.dto";

@Injectable({
    providedIn: 'root'
  })
export class UserService {

    constructor(
        public http: HttpClient, 
        public storage: StorageService) {
    }

    insert(obj: UserDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/register`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}