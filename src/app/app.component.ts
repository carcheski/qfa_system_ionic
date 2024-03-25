import { Component } from '@angular/core';
import { UsuarioService } from 'src/services/domain/usuario.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  habilitado : boolean = false;

  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Delivery', url: '/pedido', icon: 'cart'},
    
  ];
  public appPagesCadastro = [
    { title: 'Produto', url: '/produto-pesquisa', icon: 'fast-food' ,},
    { title: 'Cardápio', url: '/categoria-pesquisa', icon: 'list' },
    { title: 'Cliente', url: '/cliente-pesquisa', icon: 'people' },

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
  constructor(
    private usuarioService : UsuarioService,
  ) {
    this.autorizacao();
  }

  autorizacao(){
    let login = localStorage.getItem("login") as any;
    this.usuarioService.findByLogin(login)
    .subscribe(response =>{
      let role = response.role;
      if(role == "ADMIN"){
        this.habilitado = true;
      }
    })
  }

}
