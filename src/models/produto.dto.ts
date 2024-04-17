import { CategoriaDTO } from "./categoria.dto";

export interface ProdutoDTO {
    id : string;
    nome : string;
    preco : number;
    quantidade : number;
    vlrCompra : number;
    status : string;
    imageUrl? : string;
    categorias : CategoriaDTO [];
}