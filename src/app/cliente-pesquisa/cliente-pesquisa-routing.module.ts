import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientePesquisaPage } from './cliente-pesquisa.page';

const routes: Routes = [
  {
    path: '',
    component: ClientePesquisaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientePesquisaPageRoutingModule {}
