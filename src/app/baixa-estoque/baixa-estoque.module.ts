import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaixaEstoquePageRoutingModule } from './baixa-estoque-routing.module';

import { BaixaEstoquePage } from './baixa-estoque.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BaixaEstoquePageRoutingModule
  ],
  declarations: [BaixaEstoquePage]
})
export class BaixaEstoquePageModule {}
