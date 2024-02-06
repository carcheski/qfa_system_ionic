import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoriaDTO } from "src/models/categoria.dto";
import { Observable } from 'rxjs';
import { API_CONFIG } from "src/config/api.config";

@Injectable({
    providedIn: 'root'
  })
export class CategoriaService {

    constructor(
        public http: HttpClient
    ) {

    }

    insert(obj: CategoriaDTO) {
          return this.http.post(
              `${API_CONFIG.baseUrl}/categorias`,
              obj,
              {
                  observe: 'response',
                  responseType: 'text'
              }
          );
      }
    
      salvar(obj: CategoriaDTO) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/categorias/${obj.id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
      }
    
      findById(categoria_id : String) {
        return this.http.get<CategoriaDTO>(`${API_CONFIG.baseUrl}/categorias/${categoria_id}`);
      }

    findAll() : Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}