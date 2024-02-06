import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaPesquisaPage } from './categoria-pesquisa.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaPesquisaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaPesquisaPageRoutingModule {}
