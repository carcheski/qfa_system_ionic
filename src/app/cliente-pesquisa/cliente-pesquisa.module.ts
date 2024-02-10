import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientePesquisaPageRoutingModule } from './cliente-pesquisa-routing.module';

import { ClientePesquisaPage } from './cliente-pesquisa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientePesquisaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ClientePesquisaPage]
})
export class ClientePesquisaPageModule {}
