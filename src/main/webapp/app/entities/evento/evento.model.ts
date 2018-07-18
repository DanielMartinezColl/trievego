import { BaseEntity, User } from './../../shared';

export class Evento implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public resumen?: string,
        public descripcion?: string,
        public precio?: number,
        public fechaHora?: any,
        public direccion?: string,
        public imagenContentType?: string,
        public imagen?: any,
        public ciudad?: BaseEntity,
        public categoria?: BaseEntity,
        public estado?: BaseEntity,
        public user?: User,
        public tags?: BaseEntity[],
    ) {
    }
}
