import { CategoriaDTO } from "./categoria.dto";

export interface ProdutoDTO {
    id : string;
    nome : string;
    preco : number;
    imageUrl? : string;
    categorias : CategoriaDTO [];
}