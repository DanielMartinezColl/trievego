import { BaseEntity } from './../shared';

export class Evento implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public resumen?: string,
        public descripcion?: string,
        public precio?: number,
        public fechaHora?: any,
        public direccion?: string,
        public estado?: boolean,
        public ciudades?: BaseEntity,
        public categorias?: BaseEntity,
        public usuarios?: BaseEntity,
        public tags?: BaseEntity[],
    ) {
        this.estado = false;
    }
}
