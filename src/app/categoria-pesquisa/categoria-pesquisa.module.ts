import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaPesquisaPageRoutingModule } from './categoria-pesquisa-routing.module';

import { CategoriaPesquisaPage } from './categoria-pesquisa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaPesquisaPageRoutingModule
  ],
  declarations: [CategoriaPesquisaPage]
})
export class CategoriaPesquisaPageModule {}
