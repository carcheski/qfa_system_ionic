import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoriaDTO } from "src/models/categoria.dto";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class CategoriaService {

    constructor(
        public http: HttpClient
    ) {

    }

    findAll() : Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`/categorias`);
    }
}