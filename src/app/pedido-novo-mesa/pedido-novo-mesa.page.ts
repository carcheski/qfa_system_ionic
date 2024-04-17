import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, NavParams } from '@ionic/angular';
import { API_CONFIG } from 'src/config/api.config';
import { CartItem } from 'src/models/cart-item';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { ClienteDTO } from 'src/models/cliente.dto';
import { PagamentoDTO } from 'src/models/pagamento.dto';
import { PedidoDTO } from 'src/models/pedido.dto';
import { ProdutoDTO } from 'src/models/produto.dto';
import { CartService } from 'src/services/domain/cart.service';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { EnderecoService } from 'src/services/domain/endereco.service';
import { PedidoService } from 'src/services/domain/pedido.service';
import { ProdutoService } from 'src/services/domain/produto.service';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-pedido-novo-mesa',
  templateUrl: './pedido-novo-mesa.page.html',
  styleUrls: ['./pedido-novo-mesa.page.scss'],
})
export class PedidoNovoMesaPage implements OnInit {

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

  //Tela de Clientes
  clienteSelecionado: ClienteDTO;
  tipoClienteMesa = false;

  //Tela de Enderecos
  pedido: PedidoDTO;

  //Tela de Pagamento
  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //Tela de Confirmação do Pedido
  cartItems: CartItem[];
  cod_pedido: string;

  isAlertOpen: boolean = false;
  public alertButtons = [
    {
      text: 'OK',
      cssClass: 'alert-button-confirm',
    },
  ];


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
    public router: Router,
    public route: ActivatedRoute,
    public homePage: HomePage,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.cartService.createOrClearCart();
    this.carregarCliente();
    this.carregarCategorias();
  }

  carregarCliente(){
    this.route.queryParams
    .subscribe(params => {
      let cliente_id = params.cliente_id;
      if(cliente_id != null){
        this.clienteService.findById(cliente_id)
        .subscribe (response =>{
          this.clienteSelecionado = response;
        },
          error => {}
        );
      }
    }
  );
  
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
    if(produto.quantidade > 0){
      this.cartService.addProduto(produto);
      this.tipoTela = 3;
      this.carregarPedido();
    }else{
      this.alertaEstoque(true);
    }
  }

  alertaEstoque(isOpen: boolean){
    this.isAlertOpen = isOpen;
  }

  carregarPedido() {
    let cart = this.cartService.getCart();
    this.carrinho = cart.items;
    this.cartItems = cart.items;
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
    let cart = this.cartService.getCart();
    this.carrinho = this.cartService.increaseQuantity(produto, cart).items;
  }

  decreaseQuantity(produto: ProdutoDTO) {
    let cart = this.cartService.getCart();
    this.carrinho = this.cartService.decreaseQuantity(produto, cart).items;
    this.voltarAoEstoque();
  }

  total() : number {
    return this.cartService.total();
  }

  goOn() {
    this.tipoTela = 1;
  }

  voltarHome(){
    
    let cart = this.cartService.getCart();
    this.pedido = {
      id: null as any,
      instante: "",
      cliente: {id: this.clienteSelecionado.id},
      enderecoDeEntrega: null as any,
      pagamento: null as any,
      itens : cart.items.map(x => 
        {
          return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
    }
    this.atualizarEstoque();
    this.pedidoEmAndamento();
    this.router.navigate(['/home'], { queryParams: {cliente: this.clienteSelecionado.id}});
    this.homePage.ngOnInit();
  }

  pedidoEmAndamento(){
    if(this.pedido.pagamento == null){
      let pagamento : PagamentoDTO = {
        id: "",
        numeroDeParcelas : 0,
        tipo : "DINHEIRO",
        estado : "PENDENTE"
      }
      this.pedido.pagamento = pagamento;
    }else{
      this.pedido.pagamento.tipo = "DINHEIRO";
      this.pedido.pagamento.estado = 'PENDENTE';
    }
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        this.cod_pedido = this.extractId(response.headers.get('location') as any);
      },
      error => {
        if (error.status == 403) {
          this.router.navigate(['/home']);
        }
      });
      this.cartService.createOrClearCart();
  }

  checkout() {
    this.tipoTela = 6;
    let cart = this.cartService.getCart();
    this.pedido = {
      id: null as any,
      instante: "",
      cliente: {id: this.clienteSelecionado.id},
      enderecoDeEntrega: null as any,
      pagamento: null as any,
      itens : cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
    }
    this.atualizarEstoque();
    this.carregarTelaPagamento();
  }

  atualizarEstoque(){
    for(let i = 0 ; i < this.pedido.itens.length; i++){ 
      let prod = this.pedido.itens[i].produto;
      this.produtoService.findById(prod.id)
      .subscribe(resp =>{
        let produtoEstoque = resp
        if(produtoEstoque.quantidade >= this.pedido.itens.length){
          produtoEstoque.quantidade = (produtoEstoque.quantidade - this.pedido.itens.length)
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

  carregarTelaPagamento() {
      this.formPagamento = this.formBuilder.group({
        numeroDeParcelas: [1, Validators.required],
        tipo: ["pagamentoComDebito", Validators.required]
      });
  }

  confirmarPedido() {
    //console.log(this.cartItems); ok
    //console.log(this.clienteSelecionado); ok
    //console.log(this.enderecoSelecionado); ok
    //console.log(this.formPagamento.value);
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
    this.router.navigate(['/home'], { queryParams: {cliente: this.clienteSelecionado.id}});
    this.homePage.ngOnInit();
  }

  fecharPedido() {
    this.pedido.itens = this.cartItems;
    this.pedido.cliente = this.clienteSelecionado;
    this.pedido.pagamento.estado = 'QUITADO';
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


}
