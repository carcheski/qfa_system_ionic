import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Delivery', url: '/pedido', icon: 'cart'},
    
  ];
  public appPagesCadastro = [
    { title: 'Produto', url: '/produto-pesquisa', icon: 'fast-food' },
    { title: 'Cardápio', url: '/categoria-pesquisa', icon: 'list' },
    { title: 'Cliente', url: '/cliente-pesquisa', icon: 'people' },
    
    //{ title: 'Clientes', url: '/categorias', icon: 'paper-plane' },
    //{ title: 'Vendas', url: '/cart', icon: 'cart'},
    //{ title: 'Perfil', url: '/profile', icon: 'people' },
    //{ title: 'Sair', url: '', icon: 'exit' },
  ];
  public appPagesControle = [
    { title: 'Estoque', url: '/estoque', icon: 'albums' },
    { title: 'Baixa Estoque', url: '/baixa-estoque', icon: 'download' },
    { title: 'Controle de Vendas', url: '/controle-vendas', icon: 'list' },

  ];
  public configuracao = [
    { title: 'Perfil', url: '/profile', icon: 'person' },
    { title: 'Sair', url: '', icon: 'power' },
  ];
  constructor() {}
}
