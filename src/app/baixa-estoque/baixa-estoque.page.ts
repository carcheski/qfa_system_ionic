import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-baixa-estoque',
  templateUrl: './baixa-estoque.page.html',
  styleUrls: ['./baixa-estoque.page.scss'],
})
export class BaixaEstoquePage implements OnInit {

  items : ProdutoDTO[] = [];
  isModalOpen = false;
  produtoEditado : ProdutoDTO;

  constructor(
    public produtoService: ProdutoService,
    public router: Router
    ) { 
      
     }

  ngOnInit() {
    this.carregaProdutos();
    }

  setOpen(isOpen: boolean, produto_id : string) {
    this.isModalOpen = isOpen;
    this.produtoService.findById(produto_id)
    .subscribe(response => {
      this.produtoEditado = response;
    })
  }

  carregaProdutos() {
    this.produtoService.findAll()
    .subscribe (response =>{
      const res = ((response));
      this.items = Object.values(res);

    },
      error => this.onError
        
    );
  }

  onSucess(response: ProdutoDTO[]) {
    this.items.push
    this.items = (response);
  }

  onError(error: any) {
    console.log('Erro ao carregar os Produtos');
  }

  salvar() {
    this.isModalOpen = false;
    this.produtoService.salvar(this.produtoEditado)
    .subscribe(response => {
      this.ngOnInit();
    },
    error => {
      if (error.status == 403) {
      }
    });
  }


}