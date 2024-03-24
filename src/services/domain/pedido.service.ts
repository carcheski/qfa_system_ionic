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
        return this.http.put(
            `${API_CONFIG.baseUrl}/pedidos/${obj.id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
      }
    
    findById(id_pedido : String) {
    return this.http.get<PedidoDTO>(`${API_CONFIG.baseUrl}/pedidos/${id_pedido}`);
    }

    findByTipoCliente(tipo : String) : Observable<PedidoDTO[]> {
        return this.http.get<PedidoDTO[]>(`${API_CONFIG.baseUrl}/pedidos/cliente/tipo/${tipo}`);
    }

    findByIdCliente(id_cliente : String) {
        return this.http.get<PedidoDTO>(`${API_CONFIG.baseUrl}/pedidos/cliente/${id_cliente}`);
    }

    findAll() : Observable<PedidoDTO[]>  {
        return this.http.get<PedidoDTO[]>(`${API_CONFIG.baseUrl}/pedidos/`);
    }

    findAllByDatas(dataInicial : string, dataFinal : string) : Observable<PedidoDTO[]>  {
        return this.http.get<PedidoDTO[]>(`${API_CONFIG.baseUrl}/pedidos/${dataInicial}/e/${dataFinal}`);
    }

    findAllHoje(dataVenda : string) : Observable<PedidoDTO[]>  {
        return this.http.get<PedidoDTO[]>(`${API_CONFIG.baseUrl}/pedidos/hoje/${dataVenda}`);
    }

}