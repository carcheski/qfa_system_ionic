import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/config/api.config";
import { PedidoDTO } from "src/models/pedido.dto";

@Injectable({
    providedIn: 'root'
})
export class PedidoService {
    private pedido: PedidoDTO;
    constructor(
        public http: HttpClient
    ) {

    }

    insert(obj: PedidoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/pedidos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    salvar(obj: PedidoDTO) {
        console.log(obj)
        return this.http.put(
            `${API_CONFIG.baseUrl}/pedidos/${obj.id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
      }

    findByTipoCliente(tipo : String) : Observable<PedidoDTO[]> {
        return this.http.get<PedidoDTO[]>(`${API_CONFIG.baseUrl}/pedidos/cliente/tipo/${tipo}`);
    }

    findByIdCliente(id_cliente : String) {
        return this.http.get<PedidoDTO>(`${API_CONFIG.baseUrl}/pedidos/cliente/${id_cliente}`);
    }

}