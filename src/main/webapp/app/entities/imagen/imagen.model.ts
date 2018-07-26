import { BaseEntity } from './../../shared';

export class Imagen implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public imagenContentType?: string,
        public imagen?: any,
        public fecha?: any,
        public eventos?: BaseEntity,
    ) {
    }
}
