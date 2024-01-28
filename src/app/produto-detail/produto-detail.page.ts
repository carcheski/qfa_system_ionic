import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
import { ProdutoDTO } from 'src/models/produto.dto';
import { CartService } from 'src/services/domain/cart.service';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDTO;

  constructor(
    public route: ActivatedRoute,
    public produtoService: ProdutoService,
    public cartService: CartService,
    public router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        let produto_id = params.produto_id;
        if(produto_id != null){
          this.produtoService.findById(produto_id)
            .subscribe(response => {
              this.item = response;
              this.getImageUrlIfExists();
            },
            error => {});
        }
      });
  }

  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      },
      error => {});
  }

  addToCart(produto: ProdutoDTO) {
    this.cartService.addProduto(produto);
    this.router.navigate(['/cart']);
  }

  showCarrinho() {
    this.router.navigate(['/cart']);
  }

}
