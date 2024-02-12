import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { ClienteDTO } from 'src/models/cliente.dto';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { PedidoDTO } from 'src/models/pedido.dto';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { PedidoService } from 'src/services/domain/pedido.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  tela = "";
  pedidos : PedidoDTO[] = [];

  formCliente: FormGroup;
  cliente : ClienteDTO;
  enderecos : EnderecoDTO[] = []
  clientes : ClienteDTO[] = [];

  cli : ClienteDTO = {
    id: "",
    cpfOuCnpj: "",
    email: "",
    enderecos: this.enderecos,
    nome: "",
    tipo: "",
    imageUrl: "",
    livre : "",
  }

  constructor(
    public pedidoService: PedidoService,
    public formBuilder: FormBuilder,
    public clienteService: ClienteService
  ) {
   }

  ngOnInit() {
    this.tela = "home"
    this.carregarMesas();
    //this.verificarMesas();
  }

  carregarMesas(){
    this,this.clienteService.findByTipo('3')
    .subscribe(response => {
      this.clientes = response;
      this.verificarPedidos();
    })
  }

  pedidoMesa(cliente_id: string){
    this.pedidoService.findByIdCliente(cliente_id)
    .subscribe(response =>{
      if(response.pagamento.estado == 'PENDENTE'){
        this.tela = "pedido_pendente";
      }else{
        this.tela = "novo_pedido";
      }
    })
  }

  verificarPedidos(){
    this.pedidoService.findByTipoCliente('3')
    .subscribe(response =>{
      this.pedidos = response;
      for(let i = 0; i< this.pedidos.length ; i++){
        let pedido = this.pedidos[i];
        if(pedido.pagamento.estado == 'PENDENTE'){
          this.verificarMesas(pedido.cliente.id)
        }
      }
    })
  }

  verificarMesas(idCliente : string){
    for(let i = 0; i < this.clientes.length ; i++){
      let mesa = this.clientes[i];
      if(mesa.id == idCliente){
        mesa.livre = "S";
      }
      
    }
  }

}
