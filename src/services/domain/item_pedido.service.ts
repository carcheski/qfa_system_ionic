import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/config/api.config";
import { ItemPedidoDTO } from "src/models/item-pedido.dto";
import { ProdutoDTO } from "src/models/produto.dto";


@Injectable({
  providedIn: 'root'
})
export class itemPedidoService {

  constructor(
      public http: HttpClient
  ) {

  }
  
  findAll() : Observable<ItemPedidoDTO[]>  {
    return this.http.get<ItemPedidoDTO[]>(`${API_CONFIG.baseUrl}/itempedido/`);
  }

  findByIdProduto(produto_id : string) : Observable<ItemPedidoDTO[]>  {
    return this.http.get<ItemPedidoDTO[]>(`${API_CONFIG.baseUrl}/itemPedido/produto/${produto_id}`);
  }

  findByIdPedido(pedido_id : string) : Observable<ItemPedidoDTO[]>  {
    return this.http.get<ItemPedidoDTO[]>(`${API_CONFIG.baseUrl}/itemPedido/pedido/${pedido_id}`);
  }

}