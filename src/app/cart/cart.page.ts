import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { API_CONFIG } from 'src/config/api.config';
import { Cart } from 'src/models/cart';
import { CartItem } from 'src/models/cart-item';
import { ProdutoDTO } from 'src/models/produto.dto';
import { CartService } from 'src/services/domain/cart.service';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items: CartItem[];
  vlrTotal: number;
  cart: Cart;

  constructor(
    public produtoService: ProdutoService,
    public cartService: CartService,
    public route: ActivatedRoute,
    public router: Router,
    public navCtrl: NavController ) {
      this.vlrTotal;
     }

  ngOnInit() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
        },
        error => {});
    }
  } 


  removeItem(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).items;
  }

  decreaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.decreaseQuantity(produto, this.cart).items;
  }

  total() : number {
    return this.cartService.total();
  }

  goOn() {
    this.navCtrl.navigateRoot(['/categorias']);
  }

  checkout() {
    this.router.navigate(['/clientes']);
  }

}
