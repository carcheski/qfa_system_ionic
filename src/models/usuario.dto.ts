export interface UsuarioDTO {
	id: string;
	login: string;
	password: string;
	email: string;
	role: string;
    imageUrl? : string;
}