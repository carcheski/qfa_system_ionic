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
      //this.parametro = this.route.snapshot.paramMap.get('id');
      this.menu.enable(false);
    }
  
    ionViewDidLeave() {
      this.menu.enable(true);
    }
  
    ionViewDidEnter() {
      this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.body as any);
        this.router.navigate(['/home']);
      },
        error => {});
    }

    login(){
      console.log(this.creds);
      this.auth.authenticate(this.creds)
      .subscribe(response => {        
        this.auth.successfulLogin(response.body as any);
        this.router.navigate(['/home']);
      },
        error => {});
    }
  
    signup(){
      this.router.navigate(['/signup'])
    }
  


}
