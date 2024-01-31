import { Injectable } from "@angular/core";
import { PedidoDTO } from "src/models/pedido.dto";

@Injectable({
    providedIn: 'root'
})
export class PedidoService {
    private pedido: PedidoDTO;
    constructor() {

    }

    setPedido(pedido: PedidoDTO) {
        this.pedido = pedido;
    }

    getPedido() {
        return this.pedido;
    }
}