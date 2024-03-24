import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteDTO } from 'src/models/cliente.dto';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { PedidoDTO } from 'src/models/pedido.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { PedidoService } from 'src/services/domain/pedido.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  pedidos : PedidoDTO[] = [];
  pedido : PedidoDTO;

  formCliente: FormGroup;
  cliente : ClienteDTO;
  enderecos : EnderecoDTO[] = []
  clientes : ClienteDTO[] = [];

  atualizar : string;
  contador = 0;

  cli : ClienteDTO = {
    id : "",
    nome : "",
    tipo : "",
    cpfOuCnpj : "",
    email : "",
    telefone : "",
    enderecos : this.enderecos,
    livre : "",
  }

  constructor(
    public pedidoService: PedidoService,
    public formBuilder: FormBuilder,
    public clienteService: ClienteService,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.verificarAtualizacao();
    this.carregarMesas();
    //this.reloadComponent();
  }

  verificarAtualizacao(){
    this.route.queryParams
    .subscribe(params => {
      if(params.cliente != null){
        this.clientes = [];
        this.carregarMesas();
      }
    });
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
      console.log(response);
      if(response != null && response.pagamento.estado == 'PENDENTE'){
        this.router.navigate(['/pedido-pendente-mesa'], { queryParams: {cliente_id: cliente_id}});
        this.ngOnDestroy()
      }else{
        this.router.navigate(['/pedido-novo-mesa'], { queryParams: {cliente_id: cliente_id}});
        
      }
    })
  }

  ngOnDestroy(){
    console.log("fui")
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
