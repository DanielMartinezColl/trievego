
export class UsuarioDTO {
    constructor(
        public login?: String,
        public firstName?: String,
        public lastName?: String,
        public fechaNacimiento?: any,
        public genero?: boolean,
        public email?: String,
        public password?: String
    ) {
    }
}
