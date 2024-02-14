import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { API_CONFIG } from 'src/config/api.config';
import { CartItem } from 'src/models/cart-item';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { ClienteDTO } from 'src/models/cliente.dto';
import { PedidoDTO } from 'src/models/pedido.dto';
import { ProdutoDTO } from 'src/models/produto.dto';
import { CartService } from 'src/services/domain/cart.service';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { EnderecoService } from 'src/services/domain/endereco.service';
import { PedidoService } from 'src/services/domain/pedido.service';
import { ProdutoService } from 'src/services/domain/produto.service';
import { HomePage } from '../home/home.page';
import { PagamentoDTO } from 'src/models/pagamento.dto';

@Component({
  selector: 'app-pedido-pendente-mesa',
  templateUrl: './pedido-pendente-mesa.page.html',
  styleUrls: ['./pedido-pendente-mesa.page.scss'],
})
export class PedidoPendenteMesaPage implements OnInit {

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
    public homePage: HomePage
  ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarCliente();
  }

  carregarCliente(){
    this.route.queryParams
    .subscribe(params => {
      let cliente_id = params.cliente_id;
      if(cliente_id != null){
        this.clienteService.findById(cliente_id)
        .subscribe (response =>{
          this.clienteSelecionado = response;
          this.adicionarAoCarrinho();
        },
          error => {}
        );
      }
    });
  }

  adicionarAoCarrinho(){
    this.tipoTela = 3;
    this.pedidoService.findByIdCliente(this.clienteSelecionado.id)
      .subscribe(response => {
        let itens = response.itens;
        this.pedido = response;
        for (let i = 0 ; i< itens.length ; i++){
          let prod = itens[i].produto
          this.produtoService.findById(prod.id)
            .subscribe(response =>{
              this.carrinho = this.cartService.increaseQuantity(response).items;
              this.addToCart(response);
            })
        }
      });
  }

  carregarCategorias() {
    this.tipoTela = 1;
    this.categoriaService.findAll()
    .subscribe(response => {
      this.categorias = response;
      console.log(response)
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
    console.log("total " + start + " e fim " + end)
      let produto = Object.values(this.produtos[0]);
      produto.map((item) => {
        let prod = item.id;
        console.log(prod);
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
    this.carrinho = this.cartService.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: ProdutoDTO) {
    this.carrinho = this.cartService.decreaseQuantity(produto).items;
  }

  total() : number {
    return this.cartService.total();
  }

  goOn() {
    this.tipoTela = 1;
    this.ngOnInit();
  }

  voltarHome(){
    let cart = this.cartService.getCart();
    this.pedido = {
      id: this.pedido.id,
      cliente: this.pedido.cliente,
      enderecoDeEntrega: null as any,
      pagamento: this.pedido.pagamento,
      itens : cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
    }
    this.pedidoEmAndamento();
    this.router.navigate(['/home'], { queryParams: {cliente: this.clienteSelecionado.id}});
    this.homePage.ngOnInit();
  }

  pedidoEmAndamento(){
    if(this.pedido.pagamento.estado == 'PENDENTE'){
      this.pedidoService.salvar(this.pedido)
    }else {
      if(this.pedido.pagamento == null){
        let pagamento : PagamentoDTO = {
          numeroDeParcelas : 0,
          "@type" : "pagamentoComDebito",
          estado : "PENDENTE"
        }
        this.pedido.pagamento = pagamento;
      }else{
        this.pedido.pagamento['@type'] = "pagamentoComDebito";
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
    }
    
  }

  checkout() {
    this.tipoTela = 6;
    let cart = this.cartService.getCart();
    this.pedido = {
      id: this.pedido.id,
      cliente: this.pedido.cliente,
      enderecoDeEntrega: null as any,
      pagamento: null as any,
      itens : cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
    }
    this.carregarTelaPagamento();
  }

  carregarTelaPagamento() {
    console.log("aqui")
      this.formPagamento = this.formBuilder.group({
        numeroDeParcelas: [1, Validators.required],
        "@type": ["pagamentoComDebito", Validators.required]
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
    this.navCtrl.navigateRoot(['/home']);
  }

  fecharPedido() {
    this.pedido.itens = this.cartItems;
    this.pedido.cliente = this.clienteSelecionado;
    this.pedido.pagamento.estado = '2';
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        console.log(response.headers.get('location'));
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
