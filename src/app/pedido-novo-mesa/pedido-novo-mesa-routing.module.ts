import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoNovoMesaPage } from './pedido-novo-mesa.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoNovoMesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoNovoMesaPageRoutingModule {}
