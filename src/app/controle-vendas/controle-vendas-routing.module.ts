import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControleVendasPage } from './controle-vendas.page';

const routes: Routes = [
  {
    path: '',
    component: ControleVendasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControleVendasPageRoutingModule {}
