import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckboxCustomEvent, LoadingController, NavParams } from '@ionic/angular';
import { ItemPedidoDTO } from 'src/models/item-pedido.dto';
import { PedidoDTO } from 'src/models/pedido.dto';
import { itemPedidoService } from 'src/services/domain/item_pedido.service';
import { PedidoService } from 'src/services/domain/pedido.service';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-controle-vendas',
  templateUrl: './controle-vendas.page.html',
  styleUrls: ['./controle-vendas.page.scss'],
})
export class ControleVendasPage implements OnInit {

  pedidos : PedidoDTO[] = [];
  itens : ItemPedidoDTO[] = [];
  page : number = 0;

  canDismiss = false;

  constructor(
    public produtoService: ProdutoService,
    public route: ActivatedRoute,
    public router: Router,
    public loadingCtrl: LoadingController,
    public pedidoService: PedidoService,
    public itemPedidoService: itemPedidoService) { 
      
     }

  ngOnInit() {
    this.carregaVendas();
    }

    carregaVendas() {
      this.pedidoService.findAll()
      .subscribe(response => {
        this.pedidos = response;
        //this.carregarProdutos();
        //this.carregarCategorias();
        console.log(response);
      })
    }

    handleChangePedido(e: any) {
      const query = e.target.value.toLowerCase();
      console.log(e.target.value);
      this.pedidos = this.pedidos.filter((d) => d.id == query);
      if(e.detail.value == "" || this.pedidos == null){
        console.log("aqui")
        this.ngOnInit();
      }
    }

    filtros(){

    }

    onTermsChanged(event: Event) {
      const ev = event as CheckboxCustomEvent;
      this.canDismiss = ev.detail.checked;
    }
  
}
