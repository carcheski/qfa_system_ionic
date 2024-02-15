import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaixaEstoquePage } from './baixa-estoque.page';

const routes: Routes = [
  {
    path: '',
    component: BaixaEstoquePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaixaEstoquePageRoutingModule {}
