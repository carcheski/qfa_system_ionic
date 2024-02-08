import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController, NavParams } from '@ionic/angular';
import { isEmpty } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-produto-pesquisa',
  templateUrl: './produto-pesquisa.page.html',
  styleUrls: ['./produto-pesquisa.page.scss'],
})
export class ProdutoPesquisaPage implements OnInit {

  tipoTela: number = 1;

  formProduto: FormGroup;
  categorias: CategoriaDTO [] = [];

  cadastro()
  {
    this.tipoTela = 2;
    this.formProduto.reset();
  }

  edicao(produto_id: string)
  {
    let prodId = produto_id;
    console.log(produto_id)
    this.tipoTela = 3;
    this.carregarProdutoEdicao(prodId);
  }

  newProd : ProdutoDTO = {
    id : "",
    nome : "",
    preco : null as any,
    imageUrl : "",
    categorias : this.categorias
  };

  prod : ProdutoDTO = {
    id : "",
    nome : "",
    preco : null as any,
    imageUrl : "",
    categorias : this.categorias
  };

  items : ProdutoDTO[] = [];

  public results = [...this.items];

  constructor(
    public produtoService: ProdutoService,
    public route: ActivatedRoute,
    public router: Router,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController
  ) {

   }

  ngOnInit() {
    this.reloadComponent();
    this.carregaProdutos();
    this.formProduto = this.formBuilder.group
      (
        {
          name: ['', [Validators.required]]
        }
      )
    }

    reloadComponent() {
      let currentUrl = this.router.url;
      console.log(currentUrl);
      
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
    }

  carregaProdutos() {
    this.tipoTela = 1;
      let loader = this.presentLoading();
        this.produtoService.findAll()
        .subscribe (response =>{
          const res = ((response));
          this.items = Object.values(res);
          console.log(this.items);
          let start = this.items.length;
          let end = this.items.length - 1;
          loader.finally();
          this.loadImageUrls(start, end);
        }
    );
  }

  loadImageUrls(start: number, end: number) {
    this.items.map((item) => {
      let prod = item.id;
      this.produtoService.getSmallImageFromBucket(prod)
      .subscribe(response => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${prod}-small.jpg`;
      },
      error => {});
    })
} 

  carregarProdutoEdicao(produto_id : String) {
    console.log("aqui" + produto_id);
        if(produto_id != null){
          this.produtoService.findById(produto_id)
            .subscribe(response => {
              this.prod = response;
              this.getImageUrlIfExists();
            },
            error => {});
        };
  }

  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.prod.id)
      .subscribe(response => {
        this.prod.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.prod.id}.jpg`;
      },
      error => {});
  }

  handleChange(event: any) {
    const query = event.target.value.toLowerCase();
    this.items = this.items.filter((d) => d.nome.toLowerCase().indexOf(query) > -1);
    console.log(event.target.value);
    if(event.detail.value == "" || this.items == null){
      console.log("aqui")
      this.ngOnInit();
    }
  }

  onError(error: any) {
    console.log('Erro ao carregar os Produtos');
  }

  async presentLoading() {
    let loader = await this.loadingCtrl.create({
      message: "Aguarde...",
      duration: 1000,
    });
    loader.present();
    return loader;
  }

  showDetail(produto_id : string) {
    this.router.navigate(['/produto-cadastro'], { queryParams: {produto_id: produto_id}});
  }

  addNewProduto() {
    this.router.navigate(['/produto-cadastro']);
  }

  cadastrar() {
    this.produtoService.insert(this.newProd)
    .subscribe(response => {
      this.carregaProdutos();
      this.newProd.id = ""
      this.newProd.nome = ""
      this.newProd.preco = null as any;
    },
    error => {
    });
  }


  salvar() {
    this.produtoService.salvar(this.prod)
    .subscribe(response => {
      this.carregaProdutos();
    },
    error => {
      if (error.status == 403) {
      }
    });
  }


}
