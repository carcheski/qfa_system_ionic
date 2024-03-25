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

  page : number = 0;
  private readonly offset: number = 5;

  pageTotal : number = 0;
  private readonly offsetTotal: number = 5;

  itensPage: ProdutoDTO[] = [];
  itensPageTotal: ProdutoDTO[];

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

  produtosDaCategoria: ProdutoDTO[] = [];

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
    quantidade : null as any,
    vlrCompra : null as any,
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
    this.carregarCategorias();
    this.carregaProdutos();
  }

  reloadComponent() {
    window.location.reload();
  }

  carregarCategorias() {
    this.categoriaService.findAll()
    .subscribe(response => {
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
              this.carregarProdutosDaCategoria(response);
            },
            error => {});
        };
  }

  carregarProdutosDaCategoria(categoria: CategoriaDTO){
    let categoria_id = categoria.id
    if(categoria_id != null){
      this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe (response =>{
        const res = ((response));
        this.produtosDaCategoria = Object.values(res);
      }
      );
    }
  }

  carregaProdutos() {
    this.tipoTela = 1;
        this.produtoService.findAll()
        .subscribe (response =>{
          const res = ((response));
          this.produtos = Object.values(res);
          let start = this.items.length;
          let end = this.items.length - 1;
        }
    );
  }

  handleChangeCategoria(e: any) {
    const query = e.target.value.toLowerCase();
    this.items = this.items.filter((d) => d.nome.toLowerCase().indexOf(query) > -1);
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
    this.reloadComponent();
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
    this.reloadComponent();
    
  }

  doRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  loadData(event: any) {
    setTimeout(() => {
      let news = this.produtos.slice(this.page, this.offset+this.page);
      this.page += this.offset;
      for(let i=0; i<news.length; i++) {
        this.itensPage.push(news[i]);
      }

      if(this.itensPage.length === this.produtos.length)
        event.target.disabled = true;

      event.target.complete();
    }, 1000);
  }

}
