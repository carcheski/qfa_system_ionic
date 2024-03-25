import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/config/api.config";
import { EnderecoDTO } from "src/models/endereco.dto";


@Injectable({
    providedIn: 'root'
  })
export class EnderecoService {

    constructor
        (
            public http: HttpClient, 
            public storage: StorageService
        ) 
        {  }

    findAll() : Observable<EnderecoDTO[]>  {
        return this.http.get<EnderecoDTO[]>(`${API_CONFIG.baseUrl}/enderecos`);
    }

    findById(id_cliente: String) : Observable<EnderecoDTO> {
        return this.http.get<EnderecoDTO>(`${API_CONFIG.baseUrl}/enderecos/${id_cliente}`);
    }

    insert(obj : EnderecoDTO) {

        return this.http.post(
            `${API_CONFIG.baseUrl}/enderecos`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    salvar(obj: EnderecoDTO) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/enderecos/${obj.id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
      }
}