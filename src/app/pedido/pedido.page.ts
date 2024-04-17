import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { API_CONFIG } from 'src/config/api.config';
import { Cart } from 'src/models/cart';
import { CartItem } from 'src/models/cart-item';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { CidadeDTO } from 'src/models/cidade.dto';
import { ClienteDTO } from 'src/models/cliente.dto';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { EstadoDTO } from 'src/models/estado.dto';
import { PedidoDTO } from 'src/models/pedido.dto';
import { ProdutoDTO } from 'src/models/produto.dto';
import { CartService } from 'src/services/domain/cart.service';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { CidadeService } from 'src/services/domain/cidade.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { EnderecoService } from 'src/services/domain/endereco.service';
import { EstadoService } from 'src/services/domain/estado.service';
import { PedidoService } from 'src/services/domain/pedido.service';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  tipoTela: number = 1;
  formProduto: FormGroup;

  formPagamento: FormGroup;

  //Tela de Produtos
  produtos : ProdutoDTO[] = [];
  categorias : CategoriaDTO[] = [];
  page : number = 0;

  //Tela de Carrinho - Pedido
  carrinho: CartItem[];
  vlrTotal: number;
  cart: Cart;

  //Tela de Clientes
  clientes: ClienteDTO[] = [];
  clienteSelecionado: ClienteDTO;
  tipoClienteMesa = false;

  //Tela de Enderecos
  enderecos : EnderecoDTO[] = [];
  pedido: PedidoDTO;
  enderecoSelecionado: EnderecoDTO;

  //Tela de Pagamento
  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //Tela de Confirmação do Pedido
  cartItems: CartItem[];
  cod_pedido: string;

   // modal cliente
   isModalNewCliente = false;
   isModalEditCliente = false;
   isModalNewEndereco = false;
   formCliente: FormGroup;
   formEdit: FormGroup;
   estados: EstadoDTO[] = []
   cidades: CidadeDTO[] = []
   enderecosIniciais : EnderecoDTO[] = [];

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
    telefone : "",
    enderecos : this.enderecosIniciais,
    livre : "",
  };

  cli : ClienteDTO = {
    id : "",
    nome : "",
    tipo : "",
    cpfOuCnpj : "",
    email : "",
    telefone : "",
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
    cidade : this.cidade,
    cliente : this.cli
  };

  newEndereco : EnderecoDTO = {
    id : "",
    logradouro : "",
    bairro : "",
    numero : "",
    complemento : "",
    cep : "",
    cidade : this.cidade,
    cliente : this.cli
  };

  cadastro()
  {
    this.setOpenNewCliente(true);
    this.tipoTela = 9;
    this.carregarDadosEstado();
  }

  edicao(cli_id: string)
  {
    this.setOpenEditCliente(true);
    let cliId = cli_id;
    this.tipoTela = 10;
    this.carregarClienteEdicao(cliId);
  }

  setOpenNewCliente(isOpen: boolean) {
    this.isModalNewCliente = isOpen;
    this.checkout();
  }

  setOpenEditCliente(isOpen: boolean) {
    this.isModalEditCliente = isOpen;
    this.checkout();
  }

  setOpenNewEndereco(isOpen: boolean) {
    this.isModalNewEndereco = isOpen;
  }

  carregarDadosEstado() {
    this.estadoService.findAll()
    .subscribe(response =>{
      this.estados = response;
    })

  }

  carregarClienteEdicao(cliente_id : String) {
    if(cliente_id != null){
      this.clienteService.findById(cliente_id)
        .subscribe(response => {
          this.cli = response;
          this.carregarEnderecos();
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

handleChangeEstados(e: any) {
  this.estadoService.findById(e.target.value)
  .subscribe(response =>{
    this.estado = response;
  })
  this.carregarDadosCidade(e.target.value);
  if(e.detail.value == "" || this.clientes == null){
    this.checkout();
  }
  
}

carregarDadosCidade(id_estado : string){
  this.cidadeService.findCidades(id_estado)
  .subscribe(response =>{
    this.cidades = response;
  })
}

addNewCliente () {
  this.newCli.enderecos.push(this.endereco)
  this.clienteService.insert(this.newCli)
  .subscribe(response => {
    this.fecharModalCliente();
  },
  error => {
    if (error.status == 403) {
    }
  });
}

salvar() {
  this.clienteService.salvar(this.cli)
  .subscribe(response => {
    this.fecharModalCliente();
  },
  error => {
    if (error.status == 403) {
    }
  });
}

alterarEnderecoEditado(){
  const index = this.cli.enderecos.findIndex(objeto => objeto.id === this.endereco.id);
  this.cli.enderecos[index] = this.endereco;

  this.salvar();
}

addNewEndereco(){
  this.setOpenNewEndereco(true);
  this.carregarDadosEstado();
}

handleChangeCidades(e: any) {
  this.cidadeService.findById(e.target.value)
  .subscribe(response =>{
    this.newEndereco.cidade = response;
    this.endereco = this.newEndereco;
    this.cli.enderecos.push(this.newEndereco);
  });
  if(e.detail.value == "" || this.clientes == null){
    this.ngOnInit();
  }
  
}

salvarNewEndereco(){
  this.setOpenNewEndereco(false);
  this.carregarComboEdicaoCidade();
  this.newEndereco = {
    id : "",
    logradouro : "",
    bairro : "",
    numero : "",
    complemento : "",
    cep : "",
    cidade : this.cidade,
    cliente : this.cli
  };
}

fecharModalCliente(){
  this.isModalNewCliente = false;
  this.isModalEditCliente = false;
  this.enderecos = [];
  this.endereco = {
    id : "",
    logradouro : "",
    bairro : "",
    numero : "",
    complemento : "",
    cep : "",
    cidade : this.cidade,
    cliente : this.cli
  };
  this.checkout();
}

  showProdutos(categoria_id : string) {
       this.tipoTela = 2;
       this.carregaProdutos(categoria_id);
  }

  constructor(
    public loadingCtrl: LoadingController,
    public produtoService: ProdutoService,
    public categoriaService: CategoriaService,
    public cartService: CartService,
    public clienteService: ClienteService,
    public formBuilder: FormBuilder,
    public pedidoService: PedidoService,
    public navCtrl: NavController,
    public enderecoService: EnderecoService,
    public estadoService: EstadoService,
    public cidadeService: CidadeService,
  ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.cartService.createOrClearCart();
  }

  carregarCategorias() {
    this.tipoTela = 1;
    this.categoriaService.findAll()
    .subscribe(response => {
      this.categorias = response;
    },
    error => {}
    );
  }

  carregaProdutos(categoria_id : string) {
    let loader = this.presentLoading();
    if(categoria_id != null){
      this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe (response =>{
        const res = ((response));
        this.produtos = Object.values(res);
        let start = this.produtos.length;
        let end = this.produtos.length - 1;
        loader.finally();
        this.loadImageUrls(start, end);
      },
        error => loader.finally()
      );
    }
  }

  loadImageUrls(start: number, end: number) {
      let produto = Object.values(this.produtos[0]);
      produto.map((item) => {
        let prod = item.id;
        this.produtoService.getSmallImageFromBucket(prod)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${prod}-small.jpg`;
        },
        error => {});
      })
  } 

  async presentLoading() {
    let loader = await this.loadingCtrl.create({
      message: "Aguarde...",
      duration: 1000,
    });
    loader.present();
    return loader;
  }

  addToCart(produto: ProdutoDTO) {
    this.cartService.addProduto(produto);
    this.tipoTela = 3;
    this.carregarPedido();
  }

  carregarPedido() {
    this.cart = this.cartService.getCart();
    this.carrinho = this.cart.items;
    this.cartItems = this.cart.items;
    this.loadImageCarrinho();
  }

  loadImageCarrinho() {
    for (var i=0; i<this.carrinho.length; i++) {
      let item = this.carrinho[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
        },
        error => {});
    }
  } 

  removeItem(produto: ProdutoDTO) {
    this.carrinho = this.cartService.removeProduto(produto).items;
  }

  increaseQuantity(produto: ProdutoDTO) {
    this.carrinho = this.cartService.increaseQuantity(produto, this.cart).items;
  }

  decreaseQuantity(produto: ProdutoDTO) {
    this.carrinho = this.cartService.decreaseQuantity(produto, this.cart).items;
    this.voltarAoEstoque();
  }

  total() : number {
    return this.cartService.total();
  }

  goOn() {
    this.tipoTela = 1;
    this.carregarCategorias();
  }

  checkout() {
    this.tipoTela = 4;
    this.carregarClientes();
  }

  carregarClientes() {
    this.clienteService.findByTipoNotMesa()
    .subscribe(response => {
      this.clientes = response;
    },
    error => {}
    );
  }

  showEnderecos(cliente_id : string){
    if(cliente_id != null){
      this.clienteService.findById(cliente_id)
        .subscribe(response => {
            this.clienteSelecionado = response
            if(response.tipo == "MESA")
              this.tipoClienteMesa = true;
            if(!this.tipoClienteMesa){
              this.tipoTela = 5;
              this.carregaEnderecos(cliente_id);
            }else{
              this.tipoTela = 6;
              let cart = this.cartService.getCart();

              this.pedido = {
                id: null as any,
                instante: "",
                cliente: {id: response['id']},
                enderecoDeEntrega: null as any,
                pagamento: null as any,
                itens : cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
              }
              this.carregarTelaPagamento();
            }
        });
    }
  }

  carregaEnderecos(cliente_id : string) {
    
    if(cliente_id != null){
      this.clienteService.findById(cliente_id)
        .subscribe(response => {
          const res = ((response));
          this.clienteSelecionado = res;
          this.enderecos = Object.values(res.enderecos);

          let cart = this.cartService.getCart();

          this.pedido = {
            id: null as any,
            instante: "",
            cliente: {id: response['id']},
            enderecoDeEntrega: null as any,
            pagamento: null as any,
            itens : cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
          }

        },
        error => this.onError(error)
      );
    }
  }

  onError(error: any) {
    console.log('Erro ao carregar os Endereços');
  }

  nextPage(item: EnderecoDTO) {
    this.enderecoService.findById(item.id)
    .subscribe(resource =>{
      this.enderecoSelecionado = resource;
    });
    this.pedido.enderecoDeEntrega = {id: item.id};
    this.tipoTela = 6;
    this.carregarTelaPagamento();
  }

  carregarTelaPagamento() {
      this.formPagamento = this.formBuilder.group({
        numeroDeParcelas: [1, Validators.required],
        "@type": ["pagamentoComDebito", Validators.required]
      });
  }

  confirmarPedido() {
    //console.log(this.cartItems); ok
    //console.log(this.clienteSelecionado); ok
    //console.log(this.enderecoSelecionado); ok
    //console.log(this.formPagamento.value); ok
    this.pedido.pagamento = this.formPagamento.value;
    this.tipoTela = 7;
  }

  totalPedido() : number {
    return this.cartService.total();
  }

  back() {
    this.tipoTela = 5
  }

  home() {
    this.navCtrl.navigateRoot(['/home']);
  }

  fecharPedido() {
    this.atualizarEstoque();
    this.pedido.itens = this.cartItems;
    this.pedido.cliente = this.clienteSelecionado;
    this.pedido.enderecoDeEntrega = this.enderecoSelecionado;
    this.pedido.pagamento.estado = "QUITADO";
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        this.cod_pedido = this.extractId(response.headers.get('location') as any);
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.navigateRoot(['/home']);
        }
      });
  }

  private extractId(location : string) : string {
    this.tipoTela = 8;
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

  atualizarEstoque(){
    for(let i = 0 ; i < this.carrinho.length; i++){ 
      let prod = this.carrinho[i].produto;
      this.produtoService.findById(prod.id)
      .subscribe(resp =>{
        let produtoEstoque = resp
        if(produtoEstoque.quantidade >= this.carrinho[i].quantidade){
          produtoEstoque.quantidade = (produtoEstoque.quantidade - this.carrinho[i].quantidade)
        }
        this.produtoService.salvar(produtoEstoque)
        .subscribe(response =>{
  
        })
      });
    }
  }

  voltarAoEstoque(){
    for(let i = 0 ; i < this.pedido.itens.length; i++){ 
      let prod = this.pedido.itens[i].produto;
      this.produtoService.findById(prod.id)
      .subscribe(resp =>{
        let produtoEstoque = resp
        if(produtoEstoque.quantidade >= this.pedido.itens.length){
          produtoEstoque.quantidade = (produtoEstoque.quantidade + 1)
        }
        this.produtoService.salvar(produtoEstoque)
        .subscribe(response =>{
  
        })
      });
    }
  }

}
