import { ProdutoDTO } from "./produto.dto";

export interface CategoriaDTO {
    id : string;
    nome : string;
    status : string;
    produtos : ProdutoDTO[]
}