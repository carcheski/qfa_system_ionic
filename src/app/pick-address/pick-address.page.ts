import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { PedidoDTO } from 'src/models/pedido.dto';
import { CartService } from 'src/services/domain/cart.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(
    public storage: StorageService,
    public clienteService: ClienteService,
    public route: ActivatedRoute,
    public router: Router,
    public cartService: CartService
  ) { }

  ngOnInit() {

    this.carregaEnderecos();
  }

  carregaEnderecos() {
    this.route.queryParams
      .subscribe(params => {
        let cliente_id = params.cliente_id;
        if(cliente_id != null){
          this.clienteService.find(cliente_id)
            .subscribe(response => {
              const res = ((response));
              this.items = Object.values(res.enderecos);

              let cart = this.cartService.getCart();

              this.pedido = {
                cliente: {id: response['id']},
                enderecoDeEntrega: null as any,
                pagamento: null as any,
                itens : cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
              }

            },
            error => this.onError(error)
          );
        }
      }
    );
  }

  onError(error: any) {
    console.log('Erro ao carregar os Endereços');
  }

  showCarrinho() {
    this.router.navigate(['/cart']);
  }

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {id: item.id};
    this.router.navigate(['/payment'], { queryParams: {pedido: this.pedido}});
  }

}
