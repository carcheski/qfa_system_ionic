import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { CidadeDTO } from 'src/models/cidade.dto';
import { EstadoDTO } from 'src/models/estado.dto';
import { CidadeService } from 'src/services/domain/cidade.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { EstadoService } from 'src/services/domain/estado.service';
import { UserService } from 'src/services/domain/user.service';
import { UsuarioService } from 'src/services/domain/usuario.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public alertCtrl: AlertController
  ) {
    this.formGroup = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      password : ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role : ['1', [Validators.required]],
    });
  }

  ngOnInit() {
    
  }

  signupUser() {
    this.userService.insert(this.formGroup.value)
    .subscribe(response => {
      this.showInsertOk();
    },
    error => {});
  }

  async showInsertOk() {
    let alert = await this.alertCtrl.create({
      header : 'Sucesso!',
      message : 'Cadastro efetuado com sucesso',
      backdropDismiss : false,
      buttons : [
        {
          text : 'Ok',

        }
      ]
    });
    alert.present();
    this.formGroup.reset();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

}
