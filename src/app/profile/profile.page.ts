import { Component, OnInit } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { UsuarioDTO } from 'src/models/usuario.dto';
import { StorageService } from 'src/services/storage.service';
import { UsuarioService } from 'src/services/domain/usuario.service';
import { ClienteDTO } from 'src/models/cliente.dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  login: string = "";
  usuario: UsuarioDTO = {
    id: "",
    nome:"",
    email: "",
    imageUrl:"",
    role: "",
  };

  constructor(
    public storage: StorageService,
    public usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.login) {
      this.login = localUser.login;
      this.usuarioService.findByLogin(localUser.login)
        .subscribe(response => {
          this.usuario = response;
          this.getImageIfExists();
        },
        error => {
        });
    }
  }

  getImageIfExists() {
    this.usuarioService.getImageFromBucket(this.usuario.id)
    .subscribe(response => {
      this.usuario.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.usuario.id}.jpg`;
    },
    error => {});
  }

}
