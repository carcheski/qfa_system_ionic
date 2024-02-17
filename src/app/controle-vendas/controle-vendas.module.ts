import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControleVendasPageRoutingModule } from './controle-vendas-routing.module';

import { ControleVendasPage } from './controle-vendas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControleVendasPageRoutingModule
  ],
  declarations: [ControleVendasPage]
})
export class ControleVendasPageModule {}
