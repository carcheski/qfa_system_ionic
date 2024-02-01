import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';

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

  constructor() { }

  ngOnInit() {
  }

  cadastrar() {

  }

  limpar() {

  }

}
