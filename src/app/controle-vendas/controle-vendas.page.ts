import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckboxCustomEvent, LoadingController, NavParams } from '@ionic/angular';
import { ItemPedidoDTO } from 'src/models/item-pedido.dto';
import { PedidoDTO } from 'src/models/pedido.dto';
import { ProdutoDTO } from 'src/models/produto.dto';
import { VendaDTO } from 'src/models/venda.dto';
import { itemPedidoService } from 'src/services/domain/item_pedido.service';
import { PedidoService } from 'src/services/domain/pedido.service';
import { ProdutoService } from 'src/services/domain/produto.service';
import { DatePipe } from '@angular/common';
import { parse } from 'date-fns';

@Component({
  selector: 'app-controle-vendas',
  templateUrl: './controle-vendas.page.html',
  styleUrls: ['./controle-vendas.page.scss'],
})
export class ControleVendasPage implements OnInit {

  pedidos : PedidoDTO[] = [];
  itens : ItemPedidoDTO[] = [];
  page : number = 0;
  pedido : PedidoDTO;
  item : ItemPedidoDTO;
  produto : ProdutoDTO;

  pedidosHoje : VendaDTO[] = [];
  hoje : VendaDTO = {
    numPedido: "",
    vlrCompra: 0,
    totVlrCompra: 0,
    vlrVenda: 0,
    totVlrVenda: 0,
    qtdVendido: 0,
    produto: "",
    dataInicial: "",
    dataFinal: "",
    dataVenda: "",
    lucro: 0,
    situacao: "",
  }

  pedidosOntem : VendaDTO[] = [];
  ontem : VendaDTO = {
    numPedido: "",
    vlrCompra: 0,
    totVlrCompra: 0,
    vlrVenda: 0,
    totVlrVenda: 0,
    qtdVendido: 0,
    produto: "",
    dataInicial: "",
    dataFinal: "",
    dataVenda: "",
    lucro: 0,
    situacao: "",
  }

  pedidosSemana : VendaDTO[] = [];
  semana : VendaDTO = {
    numPedido: "",
    vlrCompra: 0,
    totVlrCompra: 0,
    vlrVenda: 0,
    totVlrVenda: 0,
    qtdVendido: 0,
    produto: "",
    dataInicial: "",
    dataFinal: "",
    dataVenda: "",
    lucro: 0,
    situacao: "",
  }

  pedidosMes : VendaDTO[] = [];
  mes : VendaDTO = {
    numPedido: "",
    vlrCompra: 0,
    totVlrCompra: 0,
    vlrVenda: 0,
    totVlrVenda: 0,
    qtdVendido: 0,
    produto: "",
    dataInicial: "",
    dataFinal: "",
    dataVenda: "",
    lucro: 0,
    situacao: "",
  }

  pedidosAno : VendaDTO[] = [];
  ano : VendaDTO = {
    numPedido: "",
    vlrCompra: 0,
    totVlrCompra: 0,
    vlrVenda: 0,
    totVlrVenda: 0,
    qtdVendido: 0,
    produto: "",
    dataInicial: "",
    dataFinal: "",
    dataVenda: "",
    lucro: 0,
    situacao: "",
  }

  pedidosPersonalizados : VendaDTO[] = [];
  personalizado : VendaDTO = {
    numPedido: "",
    vlrCompra: 0,
    totVlrCompra: 0,
    vlrVenda: 0,
    totVlrVenda: 0,
    qtdVendido: 0,
    produto: "",
    dataInicial: "",
    dataFinal: "",
    dataVenda: "",
    lucro: 0,
    situacao: "",
  }

  isModalHoje = false;
  isModalOntem = false;
  isModalSemana = false;
  isModalMes = false;
  isModalAno = false;
  isModalPersonalizado = false;

  //Quando selecionado o relatório Personalizado
  dtPersonalizado = false;
  dataInicial : Date = new Date;
  dataFinal : Date = new Date;


  constructor(
    public produtoService: ProdutoService,
    public route: ActivatedRoute,
    public router: Router,
    public loadingCtrl: LoadingController,
    public pedidoService: PedidoService,
    public itemPedidoService: itemPedidoService) { 
      
     }

  ngOnInit() {
    this.carregaVendas();
    }

    carregaVendas() {
      this.pedidoService.findAll()
      .subscribe(response => {
        this.pedidos = response;
      })
    }

    handleChangePedido(e: any) {
      const query = e.target.value.toLowerCase();
      this.pedidos = this.pedidos.filter((d) => d.id == query);
      if(e.detail.value == "" || this.pedidos == null){
        this.ngOnInit();
      }
    }

    filtros(){

    }

    vendasHoje(isOpen: boolean){
      const datepipe: DatePipe = new DatePipe('pt-BR') 
      this.isModalHoje = isOpen;
      if(this.isModalHoje){
        let endDate = new Date();
        let startDate : Date = new Date();
        var date = new Date();
        endDate.setDate(date.getDate() + 1);
        let dtInicial = datepipe.transform(startDate, 'dd-MM-yyyy');
        let dtFinal = datepipe.transform(endDate, 'dd-MM-yyyy');

        this.pedidoService.findAllByDatas(dtInicial as any, dtFinal as any)
        .subscribe(resp => {
          for(let i = 0; i < resp.length; i++){
            let ped = resp[i];
            let rec = resp[i].instante
            let dataVenda = parse(rec, 'dd/MM/yyyy', new Date());
  
            let hoje = {
              numPedido: ped.id,
              vlrCompra: 0,
              totVlrCompra: 0,
              vlrVenda: 0,
              totVlrVenda: 0,
              qtdVendido: 0,
              produto: "",
              dataInicial: "",
              dataFinal: "",
              dataVenda: "",
              lucro: 0,
              situacao: ped.pagamento.estado,
            }
            for(let e = 0; e < ped.itens.length ; e++){
              this.produtoService.findById(ped.itens[e].produto.id)
              .subscribe(response => {
                this.produto = response;
                
                hoje.qtdVendido = hoje.qtdVendido + ped.itens[e].quantidade
                if(this.produto.vlrCompra != 0)
                  hoje.totVlrCompra += hoje.qtdVendido * this.produto.vlrCompra;
                if(this.produto.preco != 0)
                  hoje.totVlrVenda += hoje.qtdVendido * this.produto.preco;
                if(hoje.totVlrVenda != 0)
                  hoje.lucro = (hoje.totVlrVenda - hoje.totVlrCompra);
                })
              }
              hoje.numPedido = ped.id;
              let data = datepipe.transform(dataVenda, 'dd-MM-yyyy');
              hoje.dataVenda = data as any;
              this.pedidosHoje.push(hoje);
          }
        })
      }else{
        this.pedidosHoje = [];
        this.dataInicial = null as any;
        this.dataFinal = null as any;
      }

    }

    vendasOntem(isOpen: boolean){
      const datepipe: DatePipe = new DatePipe('pt-BR') 
      this.isModalOntem = isOpen;
      if(this.isModalOntem){
        let endDate = new Date();
        let startDate : Date = new Date();
        var date = new Date();
        startDate.setDate(date.getDate() - 1);
        let dtInicial = datepipe.transform(startDate, 'dd-MM-yyyy');
        let dtFinal = datepipe.transform(endDate, 'dd-MM-yyyy');

        this.pedidoService.findAllByDatas(dtInicial as any, dtFinal as any)
        .subscribe(resp => {
          for(let i = 0; i < resp.length; i++){
            let ped = resp[i];
            let rec = resp[i].instante
            let dataVenda = parse(rec, 'dd/MM/yyyy', new Date());
  
            let ontem = {
              numPedido: "",
              vlrCompra: 0,
              totVlrCompra: 0,
              vlrVenda: 0,
              totVlrVenda: 0,
              qtdVendido: 0,
              produto: "",
              dataInicial: "",
              dataFinal: "",
              dataVenda: "",
              lucro: 0,
              situacao: ped.pagamento.estado
            }
            for(let e = 0; e < ped.itens.length ; e++){
              this.produtoService.findById(ped.itens[e].produto.id)
              .subscribe(response => {
                this.produto = response;
                
                ontem.qtdVendido = ontem.qtdVendido + ped.itens[e].quantidade
                if(this.produto.vlrCompra != 0)
                  ontem.totVlrCompra += ontem.qtdVendido * this.produto.vlrCompra;
                if(this.produto.preco != 0)
                  ontem.totVlrVenda += ontem.qtdVendido * this.produto.preco;
                if(ontem.totVlrVenda != 0)
                  ontem.lucro = (ontem.totVlrVenda - ontem.totVlrCompra);
                })
              }
              ontem.numPedido = ped.id;
              let data = datepipe.transform(dataVenda, 'dd-MM-yyyy');
              ontem.dataVenda = data as any;
              this.pedidosOntem.push(ontem);
          }
        })
      }else{
        this.pedidosOntem = [];
        this.dataInicial = null as any;
        this.dataFinal = null as any;
      }
    }

    vendasSemanal(isOpen: boolean){
      const datepipe: DatePipe = new DatePipe('pt-BR') 
      this.isModalSemana = isOpen;
      if(this.isModalSemana){
        let endDate = new Date();
        let startDate : Date = new Date();
        var date = new Date();
        startDate.setDate(date.getDate() - 6);
        let dtInicial = datepipe.transform(startDate, 'dd-MM-yyyy');
        let dtFinal = datepipe.transform(endDate, 'dd-MM-yyyy');

        this.pedidoService.findAllByDatas(dtInicial as any, dtFinal as any)
        .subscribe(resp => {
          for(let i = 0; i < resp.length; i++){
            let ped = resp[i];
            let rec = resp[i].instante
            let dataVenda = parse(rec, 'dd/MM/yyyy', new Date());
  
            let semana = {
              numPedido: "",
              vlrCompra: 0,
              totVlrCompra: 0,
              vlrVenda: 0,
              totVlrVenda: 0,
              qtdVendido: 0,
              produto: "",
              dataInicial: "",
              dataFinal: "",
              dataVenda: "",
              lucro: 0,
              situacao: ped.pagamento.estado
            }
            for(let e = 0; e < ped.itens.length ; e++){
              this.produtoService.findById(ped.itens[e].produto.id)
              .subscribe(response => {
                this.produto = response;
                
                semana.qtdVendido = semana.qtdVendido + ped.itens[e].quantidade
                if(this.produto.vlrCompra != 0)
                  semana.totVlrCompra += semana.qtdVendido * this.produto.vlrCompra;
                if(this.produto.preco != 0)
                  semana.totVlrVenda += semana.qtdVendido * this.produto.preco;
                if(semana.totVlrVenda != 0)
                  semana.lucro = (semana.totVlrVenda - semana.totVlrCompra);
                })
              }
              semana.numPedido = ped.id;
              let data = datepipe.transform(dataVenda, 'dd-MM-yyyy');
              semana.dataVenda = data as any;
              this.pedidosSemana.push(semana);
          }
        })
      }else{
        this.pedidosSemana = [];
        this.dataInicial = null as any;
        this.dataFinal = null as any;
      }
    }

    vendasMensal(isOpen: boolean){
      const datepipe: DatePipe = new DatePipe('pt-BR') 
      this.isModalMes = isOpen;
      if(this.isModalMes){
        let endDate = new Date();
        let startDate : Date = new Date();
        var date = new Date();
        startDate.setDate(date.getDate() -31);
        let dtInicial = datepipe.transform(startDate, 'dd-MM-yyyy');
        let dtFinal = datepipe.transform(endDate, 'dd-MM-yyyy');

        this.pedidoService.findAllByDatas(dtInicial as any, dtFinal as any)
        .subscribe(resp => {
          for(let i = 0; i < resp.length; i++){
            let ped = resp[i];
            let rec = resp[i].instante
            let dataVenda = parse(rec, 'dd/MM/yyyy', new Date());
  
            let mes = {
              numPedido: "",
              vlrCompra: 0,
              totVlrCompra: 0,
              vlrVenda: 0,
              totVlrVenda: 0,
              qtdVendido: 0,
              produto: "",
              dataInicial: "",
              dataFinal: "",
              dataVenda: "",
              lucro: 0,
              situacao: ped.pagamento.estado
            }
            for(let e = 0; e < ped.itens.length ; e++){
              this.produtoService.findById(ped.itens[e].produto.id)
              .subscribe(response => {
                this.produto = response;
                
                mes.qtdVendido = mes.qtdVendido + ped.itens[e].quantidade
                if(this.produto.vlrCompra != 0)
                  mes.totVlrCompra += mes.qtdVendido * this.produto.vlrCompra;
                if(this.produto.preco != 0)
                  mes.totVlrVenda += mes.qtdVendido * this.produto.preco;
                if(mes.totVlrVenda != 0)
                  mes.lucro = (mes.totVlrVenda - mes.totVlrCompra);
                })
              }
              mes.numPedido = ped.id;
              let data = datepipe.transform(dataVenda, 'dd-MM-yyyy');
              mes.dataVenda = data as any;
              this.pedidosMes.push(mes);
          }
        })
      }else{
        this.pedidosMes = [];
        this.dataInicial = null as any;
        this.dataFinal = null as any;
      }
    }

    vendasAnual(isOpen: boolean){
      const datepipe: DatePipe = new DatePipe('pt-BR') 
      this.isModalAno = isOpen;
      if(this.isModalAno){
        let endDate = new Date();
        let startDate : Date = new Date();
        var date = new Date();
        startDate.setDate(date.getDate() - 365);
        let dtInicial = datepipe.transform(startDate, 'dd-MM-yyyy');
        let dtFinal = datepipe.transform(endDate, 'dd-MM-yyyy');

        this.pedidoService.findAllByDatas(dtInicial as any, dtFinal as any)
        .subscribe(resp => {
          for(let i = 0; i < resp.length; i++){
            let ped = resp[i];
            let rec = resp[i].instante
            let dataVenda = parse(rec, 'dd/MM/yyyy', new Date());
  
            let ano = {
              numPedido: "",
              vlrCompra: 0,
              totVlrCompra: 0,
              vlrVenda: 0,
              totVlrVenda: 0,
              qtdVendido: 0,
              produto: "",
              dataInicial: "",
              dataFinal: "",
              dataVenda: "",
              lucro: 0,
              situacao: ped.pagamento.estado
            }
            for(let e = 0; e < ped.itens.length ; e++){
              this.produtoService.findById(ped.itens[e].produto.id)
              .subscribe(response => {
                this.produto = response;
                
                ano.qtdVendido = ano.qtdVendido + ped.itens[e].quantidade
                if(this.produto.vlrCompra != 0)
                  ano.totVlrCompra += ano.qtdVendido * this.produto.vlrCompra;
                if(this.produto.preco != 0)
                  ano.totVlrVenda += ano.qtdVendido * this.produto.preco;
                if(ano.totVlrVenda != 0)
                  ano.lucro = (ano.totVlrVenda - ano.totVlrCompra);
                })
              }
              ano.numPedido = ped.id;
              let data = datepipe.transform(dataVenda, 'dd-MM-yyyy');
              ano.dataVenda = data as any;
              this.pedidosAno.push(ano);
          }
        })
      }else{
        this.pedidosAno = [];
        this.dataInicial = null as any;
        this.dataFinal = null as any;
      }
    }

    habilitaDate(isOpen: boolean) {
      this.dtPersonalizado = isOpen;
    }

    vendasPersonalizado(isOpen: boolean){
      const datepipe: DatePipe = new DatePipe('pt-BR') 
      this.isModalPersonalizado = isOpen;
      if(this.isModalPersonalizado && this.dataInicial != null && this.dataFinal != null){
        let dtInicial = datepipe.transform(this.dataInicial, 'dd-MM-yyyy');
        let dtFinal = datepipe.transform(this.dataFinal, 'dd-MM-yyyy');

        this.pedidoService.findAllByDatas(dtInicial as any, dtFinal as any)
        .subscribe(resp => {
          for(let i = 0; i < resp.length; i++){
            let ped = resp[i];
            let rec = resp[i].instante
            let dataVenda = parse(rec, 'dd/MM/yyyy', new Date());
  
            let ano = {
              numPedido: "",
              vlrCompra: 0,
              totVlrCompra: 0,
              vlrVenda: 0,
              totVlrVenda: 0,
              qtdVendido: 0,
              produto: "",
              dataInicial: "",
              dataFinal: "",
              dataVenda: "",
              lucro: 0,
              situacao: ped.pagamento.estado
            }
            for(let e = 0; e < ped.itens.length ; e++){
              this.produtoService.findById(ped.itens[e].produto.id)
              .subscribe(response => {
                this.produto = response;
                
                ano.qtdVendido = ano.qtdVendido + ped.itens[e].quantidade
                if(this.produto.vlrCompra != 0)
                  ano.totVlrCompra += ano.qtdVendido * this.produto.vlrCompra;
                if(this.produto.preco != 0)
                  ano.totVlrVenda += ano.qtdVendido * this.produto.preco;
                if(ano.totVlrVenda != 0)
                  ano.lucro = (ano.totVlrVenda - ano.totVlrCompra);
                })
              }
              ano.numPedido = ped.id;
              let data = datepipe.transform(dataVenda, 'dd-MM-yyyy');
              ano.dataVenda = data as any;
              this.pedidosPersonalizados.push(ano);
          }
        })
      }else{
        this.pedidosPersonalizados = [];
        this.dataInicial = null as any;
        this.dataFinal = null as any;
      }
    }
}
