import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { take } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
  providers: [NavParams]
})
export class ProdutosPage implements OnInit {

  items : ProdutoDTO[] = [];

  constructor(
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public route: ActivatedRoute,
    public router: Router) { 
      
     }

  ngOnInit() {
    this.carregaProdutos();
    }

    carregaProdutos() {
      this.route.queryParams
      .subscribe(params => {
        let categoria_id = params.categoria_id;
        if(categoria_id != null){
          this.produtoService.findByCategoria(categoria_id)
          .subscribe (response =>{
            const res = ((response));
            this.items = Object.values(res);
            let start = this.items.length;
            let end = this.items.length - 1;
            this.loadImageUrls(start, end);
          },
            error => this.onError(error)
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

}
