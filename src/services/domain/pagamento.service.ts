import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/config/api.config";
import { PagamentoDTO } from "src/models/pagamento.dto";


@Injectable({
    providedIn: 'root'
  })
export class PagamentoService {

    constructor
        (
            public http: HttpClient, 
            public storage: StorageService
        ) 
        {  }
    
    findByIdPedido(id_pedido: String) : Observable<PagamentoDTO> {
        return this.http.get<PagamentoDTO>(`${API_CONFIG.baseUrl}/pagamentos/${id_pedido}`);
    }

    delete(id_pedido: String) : Observable<PagamentoDTO> {
        return this.http.delete<PagamentoDTO>(`${API_CONFIG.baseUrl}/pagamentos/${id_pedido}`);
    }

    insert(obj : PagamentoDTO) {

        return this.http.post(
            `${API_CONFIG.baseUrl}/pagamentos`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    salvar(obj: PagamentoDTO) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/pagamentos/${obj.id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
      }
}