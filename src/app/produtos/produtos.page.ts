import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { take } from 'rxjs';
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
    public route : ActivatedRoute) { 
      
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
            const values = Object.values(res);
            console.log(values);
            this.items = values;
          },
            error => this.onError(error)
          );
        }
      }
    );
  }

  onSucess(response: ProdutoDTO[]) {
    console.log("aqui " + response);
    this.items.push
    this.items = (response);
  }

  onError(error: any) {
    console.log('Erro ao carregar os filmes');
  }

}
