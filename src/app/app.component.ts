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
    { title: 'Estoque', url: '/estoque', icon: 'albums' },
    
  ];
  public appPagesCadastro = [
    { title: 'Produto', url: '/produto-pesquisa', icon: 'fast-food' },
    { title: 'Categoria', url: '/categoria-pesquisa', icon: 'file-tray-stacked' },
    { title: 'Cliente', url: '/cliente-pesquisa', icon: 'people' },
    
    //{ title: 'Clientes', url: '/categorias', icon: 'paper-plane' },
    //{ title: 'Vendas', url: '/cart', icon: 'cart'},
    //{ title: 'Perfil', url: '/profile', icon: 'people' },
    //{ title: 'Sair', url: '', icon: 'exit' },
  ];
  public configuracao = [
    { title: 'Perfil', url: '/profile', icon: 'person' },
    { title: 'Sair', url: '', icon: 'power' },
  ];
  constructor() {}
}
