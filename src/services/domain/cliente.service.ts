import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Observable } from "rxjs";
import { ClienteDTO } from "src/models/cliente.dto";
import { API_CONFIG } from "src/config/api.config";


@Injectable({
    providedIn: 'root'
  })
export class ClienteService {

    constructor
        (
            public http: HttpClient, 
            public storage: StorageService
        ) 
        {  }

    findAll() : Observable<ClienteDTO[]>  {
        return this.http.get<ClienteDTO[]>(`${API_CONFIG.baseUrl}/clientes`);
    }

    findById(id_cliente: String) : Observable<ClienteDTO> {
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/${id_cliente}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    findByTipo(tipo : string) : Observable<ClienteDTO[]>  {
        return this.http.get<ClienteDTO[]>(`${API_CONFIG.baseUrl}/clientes/tipo/${tipo}`);
    }

    insert(obj : ClienteDTO) {

        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    salvar(obj: ClienteDTO) {
        console.log(obj)
        return this.http.put(
            `${API_CONFIG.baseUrl}/clientes/${obj.id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
      }
}