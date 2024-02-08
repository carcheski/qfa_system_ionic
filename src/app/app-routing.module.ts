import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./produtos/produtos.module').then( m => m.ProdutosPageModule)
  },
  {
    path: 'produto-detail',
    loadChildren: () => import('./produto-detail/produto-detail.module').then( m => m.ProdutoDetailPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'pick-address',
    loadChildren: () => import('./pick-address/pick-address.module').then( m => m.PickAddressPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'order-confirmation',
    loadChildren: () => import('./order-confirmation/order-confirmation.module').then( m => m.OrderConfirmationPageModule)
  },
  {
    path: 'produto-pesquisa',
    loadChildren: () => import('./produto-pesquisa/produto-pesquisa.module').then( m => m.ProdutoPesquisaPageModule)
  },
  {
    path: 'categoria-pesquisa',
    loadChildren: () => import('./categoria-pesquisa/categoria-pesquisa.module').then( m => m.CategoriaPesquisaPageModule)
  },
  {
    path: 'cliente-pesquisa',
    loadChildren: () => import('./cliente-pesquisa/cliente-pesquisa.module').then( m => m.ClientePesquisaPageModule)
  },
  {
    path: 'enderecos',
    loadChildren: () => import('./enderecos/enderecos.module').then( m => m.EnderecosPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
