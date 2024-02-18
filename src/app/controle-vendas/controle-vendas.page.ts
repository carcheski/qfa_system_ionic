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
  }

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
  }

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
  }

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
  }

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
  }

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
  }

  isModalHoje = false;
  isModalOntem = false;
  isModalSemana = false;
  isModalMes = false;
  isModalAno = false;
  isModalPersonalizado = false;


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
        console.log(response);
      })
    }

    handleChangePedido(e: any) {
      const query = e.target.value.toLowerCase();
      console.log(e.target.value);
      this.pedidos = this.pedidos.filter((d) => d.id == query);
      if(e.detail.value == "" || this.pedidos == null){
        console.log("aqui")
        this.ngOnInit();
      }
    }

    filtros(){

    }

    vendasHoje(isOpen: boolean){
      this.isModalHoje = isOpen;
      if(this.isModalHoje){
        for(let i = 0; i < this.pedidos.length; i++){
          const datepipe: DatePipe = new DatePipe('pt-BR') 
          let pedido = this.pedidos[i];
          let rec = this.pedidos[i].instante
          
          //Convertando a data de String para Date
          const date = parse(rec, 'dd/MM/yyyy HH:mm', new Date());
  
          let endDate = new Date();
          let startDate : Date = new Date();
          startDate.setHours(0,0,0)
  
          const diferencaDT = (endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
          console.log("Pedido: "+ pedido.id +" data " + rec +" diferença "+ diferencaDT);
          if(diferencaDT <= 0.9){
            for(let e = 0; e < this.pedidos[i].itens.length ; e++){
              this.produtoService.findById(this.pedidos[i].itens[e].produto.id)
              .subscribe(response => {
                this.produto = response;
  
                this.hoje.qtdVendido = this.hoje.qtdVendido + this.pedidos[i].itens[e].quantidade
                  if(this.produto.vlrCompra != 0)
                this.hoje.totVlrCompra += this.hoje.qtdVendido * this.produto.vlrCompra;
                  if(this.produto.preco != 0)
                this.hoje.totVlrVenda += this.hoje.qtdVendido * this.produto.preco;
                  if(this.hoje.totVlrVenda != 0)
                this.hoje.lucro = (this.hoje.totVlrVenda - this.hoje.totVlrCompra);
                  console.log("Relatório de vendas de Hoje: " + Object.values(this.hoje));
              })
              
            }
          }
        }
      }else{
        this.hoje = {
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
        }
      }

    }

    vendasOntem(isOpen: boolean){
      this.isModalOntem = isOpen;
      if(this.isModalOntem){
        for(let i = 0; i < this.pedidos.length; i++){
          const datepipe: DatePipe = new DatePipe('pt-BR') 
          let pedido = this.pedidos[i];
          let rec = this.pedidos[i].instante
          
          //Convertando a data de String para Date
          const date = parse(rec, 'dd/MM/yyyy HH:mm', new Date());
  
          let endDate = new Date();
          let startDate : Date = new Date();
          startDate.setHours(0,0,0)
  
          const diferencaDT = (endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
          
          console.log("data " + rec +" diferença "+ diferencaDT);
          if(diferencaDT >= 1 && diferencaDT <= 1.9){
            console.log(date);
            for(let e = 0; e < this.pedidos[i].itens.length ; e++){
              this.produtoService.findById(this.pedidos[i].itens[e].produto.id)
              .subscribe(response => {
                this.produto = response;
  
                this.ontem.qtdVendido = this.ontem.qtdVendido + this.pedidos[i].itens[e].quantidade
                  if(this.produto.vlrCompra != 0)
                this.ontem.totVlrCompra += this.ontem.qtdVendido * this.produto.vlrCompra;
                  if(this.produto.preco != 0)
                this.ontem.totVlrVenda += this.ontem.qtdVendido * this.produto.preco;
                  if(this.hoje.totVlrVenda != 0)
                this.ontem.lucro += (this.ontem.totVlrVenda - this.ontem.totVlrCompra);
                  console.log("Relatório de vendas de Hoje: " + Object.values(this.ontem));
              })
              
            }
          }
        }
      }else{
        this.ontem = {
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
        }
      }
    }

    vendasSemanal(isOpen: boolean){
      this.isModalSemana = isOpen;
      if(this.isModalSemana){
        for(let i = 0; i < this.pedidos.length; i++){
          const datepipe: DatePipe = new DatePipe('pt-BR') 
          let pedido = this.pedidos[i];
          let rec = this.pedidos[i].instante
          
          //Convertando a data de String para Date
          const date = parse(rec, 'dd/MM/yyyy HH:mm', new Date());
  
          let endDate = new Date();
          let startDate : Date = new Date();
          startDate.setHours(0,0,0)
  
          const diferencaDT = (endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
  
          if(diferencaDT <= 7){
            for(let e = 0; e < this.pedidos[i].itens.length ; e++){
              this.produtoService.findById(this.pedidos[i].itens[e].produto.id)
              .subscribe(response => {
                this.produto = response;
  
                this.semana.qtdVendido = this.semana.qtdVendido + this.pedidos[i].itens[e].quantidade
                  if(this.produto.vlrCompra != 0)
                this.semana.totVlrCompra += this.semana.qtdVendido * this.produto.vlrCompra;
                  if(this.produto.preco != 0)
                this.semana.totVlrVenda += this.semana.qtdVendido * this.produto.preco;
                  if(this.hoje.totVlrVenda != 0)
                this.semana.lucro = (this.semana.totVlrVenda - this.semana.totVlrCompra);
                  console.log("Relatório de vendas de Hoje: " + Object.values(this.semana));
              })
              
            }
          }
        }
      }else{
        this.semana = {
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
        }
      }
    }

    vendasMensal(isOpen: boolean){
      this.isModalMes = isOpen;
      if(this.isModalMes){
        for(let i = 0; i < this.pedidos.length; i++){
          const datepipe: DatePipe = new DatePipe('pt-BR') 
          let pedido = this.pedidos[i];
          let rec = this.pedidos[i].instante
          
          //Convertando a data de String para Date
          const date = parse(rec, 'dd/MM/yyyy HH:mm', new Date());
  
          let endDate = new Date();
          let startDate : Date = new Date();
          startDate.setHours(0,0,0)
  
          const diferencaDT = (endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
  
          if(diferencaDT <= 31){
            for(let e = 0; e < this.pedidos[i].itens.length ; e++){
              this.produtoService.findById(this.pedidos[i].itens[e].produto.id)
              .subscribe(response => {
                this.produto = response;
                
                this.mes.qtdVendido = this.mes.qtdVendido + this.pedidos[i].itens[e].quantidade
                  if(this.produto.vlrCompra != 0)
                this.mes.totVlrCompra += this.mes.qtdVendido * this.produto.vlrCompra;
                  if(this.produto.preco != 0)
                this.mes.totVlrVenda += this.mes.qtdVendido * this.produto.preco;
                  if(this.mes.totVlrVenda != 0)
                this.mes.lucro = (this.mes.totVlrVenda - this.mes.totVlrCompra);
                  console.log("Relatório de vendas de mes: " + Object.values(this.mes));
              })
              
            }
          }
        }
      }else{
        this.mes = {
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
        }
      }
    }

    vendasAnual(isOpen: boolean){
      this.isModalAno = isOpen;
      if(this.isModalAno){
        for(let i = 0; i < this.pedidos.length; i++){
          const datepipe: DatePipe = new DatePipe('pt-BR') 
          let pedido = this.pedidos[i];
          let rec = this.pedidos[i].instante
          
          //Convertando a data de String para Date
          const date = parse(rec, 'dd/MM/yyyy HH:mm', new Date());
  
          let endDate = new Date();
          let startDate : Date = new Date();
          startDate.setHours(0,0,0)
  
          const diferencaDT = (endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
  
          if(diferencaDT <= 365){
            for(let e = 0; e < this.pedidos[i].itens.length ; e++){
              this.produtoService.findById(this.pedidos[i].itens[e].produto.id)
              .subscribe(response => {
                this.produto = response;
                
                this.ano.qtdVendido = this.ano.qtdVendido + this.pedidos[i].itens[e].quantidade
                  if(this.produto.vlrCompra != 0)
                this.ano.totVlrCompra += this.ano.qtdVendido * this.produto.vlrCompra;
                  if(this.produto.preco != 0)
                this.ano.totVlrVenda += this.ano.qtdVendido * this.produto.preco;
                  if(this.ano.totVlrVenda != 0)
                this.ano.lucro = (this.ano.totVlrVenda - this.ano.totVlrCompra);
                  console.log("Relatório de vendas de ano: " + Object.values(this.ano));
              })
              
            }
          }
        }
      }else{
        this.ano = {
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
        }
      }
    }

    vendasPersonalizado(isOpen: boolean){
      this.isModalPersonalizado = isOpen;
      if(this.isModalPersonalizado){
        for(let i = 0; i < this.pedidos.length; i++){
          const datepipe: DatePipe = new DatePipe('pt-BR') 
          let pedido = this.pedidos[i];
          let rec = this.pedidos[i].instante
          
          //Convertando a data de String para Date
          const date = parse(rec, 'dd/MM/yyyy HH:mm', new Date());
  
          let endDate = new Date();
          let startDate : Date = new Date();
          startDate.setHours(0,0,0)
  
          const diferencaDTIncial = (endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
  
          if(diferencaDTIncial <= 0.9){
            for(let e = 0; e < this.pedidos[i].itens.length ; e++){
              this.produtoService.findById(this.pedidos[i].itens[e].produto.id)
              .subscribe(response => {
                this.produto = response;
                this.hoje = {
                  numPedido: pedido.id,
                  vlrCompra: this.produto.vlrCompra,
                  totVlrCompra: 0.0,
                  vlrVenda: this.produto.preco,
                  totVlrVenda: 0.0,
                  qtdVendido: 0,
                  produto: this.produto.nome,
                  dataInicial: datepipe.transform(startDate, 'dd/MM/YYYY HH:mm') as any,
                  dataFinal: datepipe.transform(endDate, 'dd/MM/YYYY HH:mm') as any,
                  dataVenda: rec,
                  lucro: 0,
                }
  
                this.hoje.qtdVendido = this.hoje.qtdVendido + this.pedidos[i].itens[e].quantidade
                  if(this.produto.vlrCompra != 0)
                this.hoje.totVlrCompra = this.hoje.qtdVendido * this.produto.vlrCompra;
                  if(this.produto.preco != 0)
                this.hoje.totVlrVenda = this.hoje.qtdVendido * this.produto.preco;
                  if(this.hoje.totVlrVenda != 0)
                this.hoje.lucro = (this.hoje.totVlrVenda - this.hoje.totVlrCompra);
                  console.log("Relatório de vendas de Hoje: " + Object.values(this.hoje));
              })
              
            }
          }
        }
      }else{
        this.ano = {
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
        }
      }
    }
}
