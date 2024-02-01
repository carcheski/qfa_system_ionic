import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavParams } from '@ionic/angular';
import { API_CONFIG } from 'src/config/api.config';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-produto-pesquisa',
  templateUrl: './produto-pesquisa.page.html',
  styleUrls: ['./produto-pesquisa.page.scss'],
})
export class ProdutoPesquisaPage implements OnInit {

  prod : ProdutoDTO = {
    id : "",
    nome : "",
    preco : null as any,
    imageUrl : "" 
  };

  items : ProdutoDTO[] = [];

  public results = [...this.items];

  constructor(
    public produtoService: ProdutoService,
    public route: ActivatedRoute,
    public router: Router,
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.carregaProdutos();
    }

    carregaProdutos() {
        let loader = this.presentLoading();
          this.produtoService.findAll()
          .subscribe (response =>{
            const res = ((response));
            this.items = Object.values(res);
            console.log(this.items);
            let start = this.items.length;
            let end = this.items.length - 1;
            loader.finally();
            this.loadImageUrls(start, end);
          }
    );
  }

  loadImageUrls(start: number, end: number) {
      this.items.map((item) => {
        let prod = item.id;
        this.produtoService.getSmallImageFromBucket(prod)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${prod}-small.jpg`;
        },
        error => {});
      })
  } 

  handleChange(event: any) {
    console.log(event)
    const query = event.target.value.toLowerCase();
    this.items = this.items.filter((d) => d.nome.toLowerCase().indexOf(query) > -1);
    console.log(query);
    if(query){
      this.carregaProdutos;
    }
  }

  onError(error: any) {
    console.log('Erro ao carregar os Produtos');
  }

  async presentLoading() {
    let loader = await this.loadingCtrl.create({
      message: "Aguarde...",
      duration: 1000,
    });
    loader.present();
    return loader;
  }

}
