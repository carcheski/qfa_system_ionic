import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoNovoMesaPageRoutingModule } from './pedido-novo-mesa-routing.module';

import { PedidoNovoMesaPage } from './pedido-novo-mesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoNovoMesaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PedidoNovoMesaPage]
})
export class PedidoNovoMesaPageModule {}
