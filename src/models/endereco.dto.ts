import { CidadeDTO } from "./cidade.dto";
import { ClienteDTO } from "./cliente.dto";

export interface EnderecoDTO {
    id : string;
    logradouro : string;
    numero : string;
    complemento : string;
    bairro : string;
    cep : string;
    cidade : CidadeDTO;
    cliente : ClienteDTO;
}