import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { CidadeService } from 'src/services/domain/cidade.service';
import { EstadoService } from 'src/services/domain/estado.service';
import { ClienteService } from 'src/services/domain/cliente.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    CidadeService,
    EstadoService,
    ClienteService
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
