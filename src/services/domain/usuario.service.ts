import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Observable } from "rxjs";
import { UsuarioDTO } from "src/models/usuario.dto";
import { API_CONFIG } from "src/config/api.config";

@Injectable({
    providedIn: 'root'
  })
export class UsuarioService {

    constructor(
        public http: HttpClient, 
        public storage: StorageService) {
    }

    findByLogin(login: string) : Observable<UsuarioDTO> {
        return this.http.get<UsuarioDTO>(
            `${API_CONFIG.baseUrl}/users/login?value=${login}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }
}