import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Categorias', url: '/categorias', icon: 'paper-plane' },
    { title: 'Vendas', url: '/cart', icon: 'cart'},
    { title: 'Perfil', url: '/profile', icon: 'people' },
    { title: 'Sair', url: '', icon: 'exit' },
  ];
  public appPagesCadastro = [
    { title: 'Produto', url: '/produto-pesquisa', icon: 'home' },
    { title: 'Categoria', url: '/categoria-pesquisa', icon: 'home' },
    //{ title: 'Clientes', url: '/categorias', icon: 'paper-plane' },
    //{ title: 'Vendas', url: '/cart', icon: 'cart'},
    //{ title: 'Perfil', url: '/profile', icon: 'people' },
    //{ title: 'Sair', url: '', icon: 'exit' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
