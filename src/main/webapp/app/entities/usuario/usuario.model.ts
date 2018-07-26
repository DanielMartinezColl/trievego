import { BaseEntity, User } from './../../shared';

export class Usuario implements BaseEntity {
    constructor(
        public id?: number,
        public fechaNacimiento?: any,
        public genero?: boolean,
        public user?: User,
        public favoritos?: BaseEntity[],
        public participas?: BaseEntity[],
        public tags?: BaseEntity[],
    ) {
        this.genero = false;
    }
}
