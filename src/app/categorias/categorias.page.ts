import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { CategoriaService } from 'src/services/domain/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaDTO[] = [];

  constructor(
    public categoriaService: CategoriaService,
    public router: Router
  ) { }

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.categoriaService.findAll()
    .subscribe(response => {
      this.items = response;
    },
    error => {}
    );
  }

  showProdutos(categoria_id : string) {
    this.router.navigate(['/produtos'], { queryParams: {categoria_id: categoria_id}});    
  }

  showCarrinho() {
    this.router.navigate(['/cart']);
  }

}
