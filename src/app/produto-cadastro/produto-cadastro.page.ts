import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { API_CONFIG } from 'src/config/api.config';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.page.html',
  styleUrls: ['./produto-cadastro.page.scss'],
})
export class ProdutoCadastroPage implements OnInit {

  prod : ProdutoDTO = {
    id : "",
    nome : "",
    preco : null as any,
    imageUrl : "" 
  };

  categorias: CategoriaDTO [] = []

  constructor(
    public route: ActivatedRoute,
    public produtoService: ProdutoService,
    public router: Router,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.route.queryParams
      .subscribe(params => {
        let produto_id = params.produto_id;
        if(produto_id != null){
          this.produtoService.findById(produto_id)
            .subscribe(response => {
              this.prod = response;
              this.getImageUrlIfExists();
            },
            error => {});
        }
      });
  }

  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.prod.id)
      .subscribe(response => {
        this.prod.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.prod.id}.jpg`;
      },
      error => {});
  }

  cadastrar() {
    this.produtoService.insert(this.prod)
    .subscribe(response => {
      const params : NavigationExtras = {
        fragment: this.prod.id
      };
      this.router.navigate(['/produto-pesquisa'], params);
      this.carregarProdutos();
    },
    error => {
      if (error.status == 403) {
        this.navCtrl.navigateRoot(['/home']);
      }
    });
  }

  carregaProdutos() {
      this.produtoService.findAll()
      .subscribe (response =>{
      }
);
}

  salvar() {
    this.produtoService.salvar(this.prod)
    .subscribe(response => {
      const params : NavigationExtras = {
        fragment: this.prod.id
      };
      console.log(params);
      this.router.navigate(['/produto-pesquisa'], params);
    },
    error => {
      if (error.status == 403) {
        this.navCtrl.navigateRoot(['/home']);
      }
    });
  }

}
