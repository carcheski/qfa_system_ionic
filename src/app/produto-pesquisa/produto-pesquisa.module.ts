import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdutoPesquisaPageRoutingModule } from './produto-pesquisa-routing.module';

import { ProdutoPesquisaPage } from './produto-pesquisa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdutoPesquisaPageRoutingModule
  ],
  declarations: [ProdutoPesquisaPage]
})
export class ProdutoPesquisaPageModule {}
