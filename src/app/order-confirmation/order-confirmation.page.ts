import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CartItem } from 'src/models/cart-item';
import { ClienteDTO } from 'src/models/cliente.dto';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { PedidoDTO } from 'src/models/pedido.dto';
import { CartService } from 'src/services/domain/cart.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { PedidoService } from 'src/services/domain/pedido.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codpedido: string;

  constructor(
    public router: Router, 
    public route: ActivatedRoute,
    public clienteService: ClienteService,
    public cartService: CartService,
    public pedidoService: PedidoService,
    public navCtrl: NavController) {
      this.pedido = this.router.getCurrentNavigation()?.extras.state as PedidoDTO;

  }


  ngOnInit() {
    
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
      },
      error => {
        this.router.navigate(['/home'], { queryParams: {pedido: this.pedido}});
      });
  }

  private findEndereco(id: string, list: EnderecoDTO[]) : EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() : number {
    return this.cartService.total();
  }

  back() {
    this.navCtrl.navigateRoot(['/cart']);
  }

  home() {
    this.navCtrl.navigateRoot(['/categorias']);
  }

  checkout() {
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        this.codpedido = this.extractId(response.headers.get('location') as any);
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.navigateRoot(['/home']);
        }
      });
  }

  private extractId(location : string) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

}
