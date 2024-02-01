import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavParams } from '@ionic/angular';
import { take } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';
import { CartPage } from '../cart/cart.page';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
  providers: [NavParams]
})
export class ProdutosPage implements OnInit {

  items : ProdutoDTO[] = [];
  page : number = 0;
  carrinho = CartPage;

  constructor(
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public route: ActivatedRoute,
    public router: Router,
    public loadingCtrl: LoadingController) { 
      
     }

  ngOnInit() {
    this.carregaProdutos();
    }

    carregaProdutos() {
      this.route.queryParams
      .subscribe(params => {
        let loader = this.presentLoading();
        let categoria_id = params.categoria_id;
        if(categoria_id != null){
          this.produtoService.findByCategoria(categoria_id, this.page, 10)
          .subscribe (response =>{
            const res = ((response));
            this.items = Object.values(res);
            let start = this.items.length;
            let end = this.items.length - 1;
            loader.finally();
            this.loadImageUrls(start, end);
          },
            error => loader.finally()
          );
        }
      }
    );
  }

  loadImageUrls(start: number, end: number) {
    console.log("total " + start + " e fim " + end)
      let produto = Object.values(this.items[0]);
      produto.map((item) => {
        let prod = item.id;
        console.log(prod);
        this.produtoService.getSmallImageFromBucket(prod)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${prod}-small.jpg`;
        },
        error => {});
      })
  } 
  
  doRefresh(refresher: any) {
    this.page = 0;
    this.items = [];
    this.carregaProdutos();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll : any) {
    this.page++;
    this.carregaProdutos();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

  onSucess(response: ProdutoDTO[]) {
    console.log("aqui " + response);
    this.items.push
    this.items = (response);
  }

  onError(error: any) {
    console.log('Erro ao carregar os Produtos');
  }

  showDetail(produto_id : string) {
    this.router.navigate(['/produto-detail'], { queryParams: {produto_id: produto_id}});
  }

  showCarrinho() {
    this.router.navigate(['/cart']);
  }

  async presentLoading() {
    let loader = await this.loadingCtrl.create({
      message: "Aguarde...",
      duration: 1000,
    });
    loader.present();
    return loader;
  }

}
