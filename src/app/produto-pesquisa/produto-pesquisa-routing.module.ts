import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoPesquisaPage } from './produto-pesquisa.page';

const routes: Routes = [
  {
    path: '',
    component: ProdutoPesquisaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoPesquisaPageRoutingModule {}
