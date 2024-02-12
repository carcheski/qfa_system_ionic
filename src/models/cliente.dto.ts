import { EnderecoDTO } from "./endereco.dto";

export interface ClienteDTO {
    id : string;
    nome : string;
    tipo : string;
    cpfOuCnpj : "";
    email : string;
    imageUrl? : string;
    enderecos : EnderecoDTO[];
    livre : string;
}