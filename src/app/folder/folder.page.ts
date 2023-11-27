import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  creds : CredenciaisDTO = {
    login: "",
    senha: ""
  };
  constructor(
    public router: Router,
    public menu: MenuController) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.menu.enable(false);
  }

  login() {
    console.log(this.creds);
    this.router.navigate(['/home']);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }
}
