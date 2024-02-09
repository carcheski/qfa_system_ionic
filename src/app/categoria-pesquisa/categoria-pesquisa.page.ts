import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { ProdutoDTO } from 'src/models/produto.dto';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-categoria-pesquisa',
  templateUrl: './categoria-pesquisa.page.html',
  styleUrls: ['./categoria-pesquisa.page.scss'],
})
export class CategoriaPesquisaPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  tipoTela: number = 1;

  formProduto: FormGroup;

  cadastro()
  {
    this.tipoTela = 2;
  }

  edicao(cat_id: string)
  {
    let catId = cat_id;
    this.tipoTela = 3;
    this.carregarCategoriaEdicao(catId);
  }

  items: CategoriaDTO[] = [];
  categorias: CategoriaDTO[] = [];
  produtos: ProdutoDTO[] = [];

  newCat : CategoriaDTO = {
    id : "",
    nome : "",
    produtos : this.produtos
  };

  cat : CategoriaDTO = {
    id : "",
    nome : "",
    produtos : this.produtos
  };

  prod : ProdutoDTO = {
    id : "",
    nome : "",
    preco : null as any,
    imageUrl : "",
    categorias : this.categorias
  };

  produtosSelecionados: ProdutoDTO[] = [];
  produtosComCategoria: ProdutoDTO[] = [];

  constructor(
    public categoriaService: CategoriaService,
    public produtoService: ProdutoService,
    public router: Router
    ) { }

  ngOnInit() {
    this.reloadComponent();
    this.carregarCategorias();
    this.carregaProdutos();
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    console.log(currentUrl);
    
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
  }

  carregarCategorias() {
    this.categoriaService.findAll()
    .subscribe(response => {
      console.log(response);
      this.items = response;
    },
    error => {}
    );
  }

  carregarCategoriaEdicao(cat_id : String) {
        if(cat_id != null){
          this.categoriaService.findById(cat_id)
            .subscribe(response => {
              this.cat = response;
            },
            error => {});
        };
  }

  carregaProdutos() {
    this.tipoTela = 1;
        this.produtoService.findAll()
        .subscribe (response =>{
          const res = ((response));
          this.produtos = Object.values(res);
          console.log(this.items);
          let start = this.items.length;
          let end = this.items.length - 1;
        }
    );

    console.log(this.produtos);
  }

  handleChangeCategoria(e: any) {
    const query = e.target.value.toLowerCase();
    this.items = this.items.filter((d) => d.nome.toLowerCase().indexOf(query) > -1);
    console.log(e.target.value);
    if(e.detail.value == "" || this.items == null){
      this.ngOnInit();
    }
  }

  handleChange(e: any) {
    let ids = e.detail.value;
    for(var i = 0; i < ids.length; i++)
    { 
      this.produtoService.findById(ids[i])
      .subscribe (response =>{
        this.produtosSelecionados.push(response);

        if(this.tipoTela == 3){
          this.cat.produtos.push(response);
        }else{
          this.newCat.produtos.push(response);
        }
      })
    }
  }

  cadastrar() {
    this.categoriaService.insert(this.newCat)
    .subscribe(response => {
      this.newCat.id = ""
      this.newCat.nome = ""
    },
    error => {
    });
    this.tipoTela = 1;
    this.ngOnInit();
  }


  salvar() {
    this.categoriaService.salvar(this.cat)
    .subscribe(response => {
    },
    error => {
      if (error.status == 403) {
      }
    });

    this.categorias.push(this.cat);
    this.carregarCategorias();

    console.log(this.produtosSelecionados);
    
  }

  doRefresh(event: any) {
    console.log("refresh")
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
