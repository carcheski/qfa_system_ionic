import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.page.html',
  styleUrls: ['./estoque.page.scss'],
})
export class EstoquePage implements OnInit {

  items : ProdutoDTO[] = [];
  isModalOpen = false;

  constructor(
    public produtoService: ProdutoService,
    public router: Router
    ) { 
      
     }

  ngOnInit() {
    this.carregaProdutos();
    }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
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

}
