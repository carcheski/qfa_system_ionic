import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CidadeDTO } from 'src/models/cidade.dto';
import { ClienteDTO } from 'src/models/cliente.dto';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { EstadoDTO } from 'src/models/estado.dto';
import { ClienteService } from 'src/services/domain/cliente.service';

@Component({
  selector: 'app-cliente-pesquisa',
  templateUrl: './cliente-pesquisa.page.html',
  styleUrls: ['./cliente-pesquisa.page.scss'],
})
export class ClientePesquisaPage implements OnInit {

  tipoTela: number = 1;

  formCliente: FormGroup;

  cadastro()
  {
    this.tipoTela = 2;
    this.formCliente.reset();
  }

  edicao(cli_id: string)
  {
    let cliId = cli_id;
    this.tipoTela = 3;
    this.carregarClienteEdicao(cliId);
  }

  clientesSelecionados: ClienteDTO[] = [];
  items: ClienteDTO[] = [];
  enderecosIniciais : EnderecoDTO[] = [];
  enderecos : EnderecoDTO[] = [];

  estado : EstadoDTO = {
    id : "",
    nome : ""
  }

  cidade : CidadeDTO = {
    id : "",
    nome : "",
    estado : this.estado
  };

  newCli : ClienteDTO = {
    id : "",
    nome : "",
    email : "",
    enderecos : this.enderecosIniciais,
  };

  cli : ClienteDTO = {
    id : "",
    nome : "",
    email : "",
    enderecos : this.enderecosIniciais,
  };

  endereco : EnderecoDTO = {
    id : "",
    logradouro : "",
    bairro : "",
    numero : "",
    complemento : "",
    cep : "",
    cidade : this.cidade
  };

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
    console.log(cliente_id);
    this.router.navigate(['/pick-address'], { queryParams: {cliente_id: cliente_id}});    
  }

  handleChangeCliente(e: any) {
    const query = e.target.value.toLowerCase();
    this.items = this.items.filter((d) => d.nome.toLowerCase().indexOf(query) > -1);
    console.log(e.target.value);
    if(e.detail.value == "" || this.items == null){
      console.log("aqui")
      this.ngOnInit();
    }
  }

  handleChange(e: any) {
    
    
  }

  carregarClienteEdicao(cliente_id : String) {
    console.log("aqui" + cliente_id);
        if(cliente_id != null){
          this.clienteService.findById(cliente_id)
            .subscribe(response => {
              this.cli = response;
              //this.getImageUrlIfExists();
            },
            error => {});
        };
  }

  salvar() {
    this.clienteService.salvar(this.cli)
    .subscribe(response => {
      this.carregarClientes();
    },
    error => {
      if (error.status == 403) {
      }
    });
  }

}
