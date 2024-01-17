import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { AuthService } from 'src/services/auth.service';

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
    password: ""
  };
  constructor(
    public router: Router,
    public menu: MenuController,
    public auth: AuthService
    ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.menu.enable(false);
  }

  ionViewDidEnter() {
    this.auth.refreshToken()
    .subscribe(response => {
      this.auth.successfulLogin(response.body as any);
      this.router.navigate(['/home']);
    },
    error => {});  
  }

  login() {
    
    this.auth.authenticate(this.creds)
    .subscribe(response =>{
      this.auth.successfulLogin(response.body as any);
      this.router.navigate(['/home']);
    })

  }

  signup() {
      this.router.navigate(['/signup']);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }
}
