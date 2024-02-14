import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoPendenteMesaPageRoutingModule } from './pedido-pendente-mesa-routing.module';

import { PedidoPendenteMesaPage } from './pedido-pendente-mesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoPendenteMesaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PedidoPendenteMesaPage]
})
export class PedidoPendenteMesaPageModule {}
