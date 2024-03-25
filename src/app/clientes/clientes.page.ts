import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from 'src/services/domain/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  items: ClienteDTO[] = [];

  constructor(
    public router: Router,
    public clienteService: ClienteService
    ) { }

  ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clienteService.findAll()
    .subscribe(response => {
      this.items = response;
    },
    error => {}
    );
  }

  showEnderecos(cliente_id : ClienteDTO) {
    this.router.navigate(['/pick-address'], { queryParams: {cliente_id: cliente_id}});    
  }

  showCarrinho() {
    this.router.navigate(['/cart']);
  }

}
