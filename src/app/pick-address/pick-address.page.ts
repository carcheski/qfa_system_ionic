import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: EnderecoDTO[];

  constructor(
    public storage: StorageService,
    public clienteService: ClienteService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {

    this.carregaEnderecos();
  }

  carregaEnderecos() {
    this.route.queryParams
      .subscribe(params => {
        let cliente_id = params.cliente_id;
        console.log(cliente_id);
        if(cliente_id != null){
          this.clienteService.find(cliente_id)
            .subscribe(response => {
              const res = ((response));
              console.log(res.enderecos);
              this.items = Object.values(res.enderecos);
            },
            error => this.onError(error)
          );
        }
      }
    );
  }

  onError(error: any) {
    console.log('Erro ao carregar os Endereços');
  }

  showCarrinho() {
    this.router.navigate(['/cart']);
  }

}
