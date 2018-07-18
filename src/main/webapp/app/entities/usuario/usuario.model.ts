import { BaseEntity, User } from './../../shared';

export class Usuario implements BaseEntity {
    constructor(
        public id?: number,
        public fechaNacimiento?: any,
        public user?: User,
        public genero?: BaseEntity,
        public eventos?: BaseEntity[],
        public participas?: BaseEntity[],
    ) {
    }
}
