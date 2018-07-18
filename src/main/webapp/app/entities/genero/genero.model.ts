import { BaseEntity } from './../../shared';

export class Genero implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
    ) {
    }
}
