import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/config/api.config";
import { ProdutoDTO } from "src/models/produto.dto";


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private produto: ProdutoDTO;
    constructor(
        public http: HttpClient
    ) {

    }

    insert(obj: ProdutoDTO) {
      console.log(obj)
        return this.http.post(
            `${API_CONFIG.baseUrl}/produtos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    salvar(obj: ProdutoDTO) {
      console.log(obj)
      return this.http.put(
          `${API_CONFIG.baseUrl}/produtos/${obj.id}`,
          obj,
          {
              observe: 'response',
              responseType: 'text'
          }
      );
  }

  findById(produto_id : String) {
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
  }

  findAll() : Observable<ProdutoDTO[]>  {
    return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produtos/`);
}

  findByNome(nome : string) : Observable<ProdutoDTO>{
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos?nome=${nome}`);
  }

  findByCategoria(categoria_id : string, page : number = 0, linesPerPage : number = 24) : Observable<ProdutoDTO[]>{
    return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produtos?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
  }

  getSmallImageFromBucket(id : string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
    return this.http.get(url, {responseType : 'blob'});
  }

  getImageFromBucket(id : string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`
    return this.http.get(url, {responseType : 'blob'});
  }  
}