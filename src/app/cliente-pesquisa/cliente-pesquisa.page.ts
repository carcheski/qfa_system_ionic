import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckboxCustomEvent } from '@ionic/angular';
import { CidadeDTO } from 'src/models/cidade.dto';
import { ClienteDTO } from 'src/models/cliente.dto';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { EstadoDTO } from 'src/models/estado.dto';
import { CidadeService } from 'src/services/domain/cidade.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { EnderecoService } from 'src/services/domain/endereco.service';
import { EstadoService } from 'src/services/domain/estado.service';

@Component({
  selector: 'app-cliente-pesquisa',
  templateUrl: './cliente-pesquisa.page.html',
  styleUrls: ['./cliente-pesquisa.page.scss'],
})
export class ClientePesquisaPage implements OnInit {

  tipoTela: number = 1;
  formCliente: FormGroup;
  formEdit: FormGroup;

  cadastro()
  {
    this.setOpen(true);
    this.tipoTela = 2;
    this.carregarDadosEstado();
  }

  edicao(cli_id: string)
  {
    this.setOpen(true);
    let cliId = cli_id;
    this.tipoTela = 3;
    this.carregarClienteEdicao(cliId);
  }

  clientesSelecionados: ClienteDTO[] = [];
  items: ClienteDTO[] = [];
  enderecosIniciais : EnderecoDTO[] = [];
  enderecos : EnderecoDTO[] = [];

  cidades : CidadeDTO[] = [];
  estados : EstadoDTO[] = [];

  estado : EstadoDTO = {
    id : "",
    nome : "",
    uf : "",
  }

  cidade : CidadeDTO = {
    id : "",
    nome : "",
    estado_id : "",
    estado : this.estado,
  };

  newCli : ClienteDTO = {
    id : "",
    nome : "",
    tipo : "",
    cpfOuCnpj : "",
    email : "",
    enderecos : this.enderecosIniciais,
    livre : "",
  };

  cli : ClienteDTO = {
    id : "",
    nome : "",
    tipo : "",
    cpfOuCnpj : "",
    email : "",
    enderecos : this.enderecosIniciais,
    livre: "",
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

  // modal tipo cliente
  isModalOpen = false;
  pessoa = false;
  mesa = false;

  constructor(
    public router: Router,
    public clienteService: ClienteService,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public enderecoService: EnderecoService,
    public formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.reloadComponent();
    this.carregarClientes();
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    console.log(currentUrl);
    
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
  }


  carregarClientes() {
    this.tipoTela = 1;
    this.clienteService.findAll()
    .subscribe(response => {
      this.items = response;
      console.log(this.items)
    },
    error => {}
    );
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  checkPessoa(event: Event) {
    const ev = event as CheckboxCustomEvent;
    this.mesa = false;
    this.pessoa = ev.detail.checked;
    this.setOpen(false);
  }

  checkMesa(event: Event) {
    const ev = event as CheckboxCustomEvent;
    this.pessoa = false;
    this.mesa = ev.detail.checked;
    this.setOpen(false);
  }

  handleChangeTipoCliente(e: any) {
    console.log(e.target.value);
    if(e.detail.value != ""){
      this.newCli.tipo = e.target.value;
      console.log(this.newCli.tipo);
    }
    
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

  handleChangeEndereco(e: any) {
    this.enderecoService.findById(e.target.value)
    .subscribe(response =>{
      this.endereco = response;
      this.carregarComboEdicaoCidade();
    })
  }

  carregarComboEdicaoCidade(){
    this.cidadeService.findById(this.endereco.cidade.id)
    .subscribe(response =>{
      this.cidade = response;
      this.carregarComboEdicaoEstado();
    })
  }

  carregarComboEdicaoEstado(){
    this.estadoService.findById(this.cidade.estado.id)
    .subscribe(res =>{
      this.estado = res;
    })
      let idCidade = this.endereco.cidade.id;
      let id = this.cidade.estado.id;
      this.formEdit = this.formBuilder.group({
        estadoIdEditado: [id, Validators.required],
        cidadeIdEditado: [idCidade, Validators.required],
      });
      this.carregarDadosCidade(this.cidade.estado.id);
  }

  handleChangeCidades(e: any) {
    this.cidadeService.findById(e.target.value)
    .subscribe(response =>{
      this.endereco.cidade = response;
      this.newCli.enderecos.push(this.endereco);
    });
    if(e.detail.value == "" || this.items == null){
      console.log("aqui")
      this.ngOnInit();
    }
    
  }

  handleChangeEstados(e: any) {
    this.estadoService.findById(e.target.value)
    .subscribe(response =>{
      this.estado = response;
    })
    this.carregarDadosCidade(e.target.value);
    if(e.detail.value == "" || this.items == null){
      this.ngOnInit();
    }
    
  }

  carregarClienteEdicao(cliente_id : String) {
        if(cliente_id != null){
          this.clienteService.findById(cliente_id)
            .subscribe(response => {
              this.cli = response;
              this.carregarEnderecos();
              console.log(this.endereco.id);
            },
            error => {});
        };
  }

  carregarEnderecos(){
    if(this.cli.id != null){
      this.clienteService.findById(this.cli.id)
        .subscribe(response => {
          const res = ((response));
          this.enderecos = Object.values(res.enderecos);

        },
        error => this.onError(error)
      );
    }
    if(this.enderecos = []){
      this.carregarDadosEstado();
    }
  }

  onError(error: any) {
    console.log('Erro ao carregar os Endereços');
  }

  carregarDadosCidade(id_estado : string){
    this.cidadeService.findCidades(id_estado)
    .subscribe(response =>{
      this.cidades = response;
    })
  }

  carregarDadosEstado() {
    this.estadoService.findAll()
    .subscribe(response =>{
      this.estados = response;
    })

  }

  salvar() {
    if(this.mesa)
      this.newCli.tipo = 'MESA';
    this.clienteService.salvar(this.cli)
    .subscribe(response => {
      this.carregarClientes();
    },
    error => {
      if (error.status == 403) {
      }
    });
  }

  inserir() {
    if(this.mesa)
      this.newCli.tipo = 'MESA';
    console.log(this.newCli)
    this.clienteService.insert(this.newCli)
    .subscribe(response => {
      this.tipoTela = 1;
      this.ngOnInit();
    },
    error => {
      if (error.status == 403) {
      }
    });
  }

}
