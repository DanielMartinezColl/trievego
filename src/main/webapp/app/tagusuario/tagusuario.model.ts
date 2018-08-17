import { BaseEntity } from './../shared';

export class Tag implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public estado?: boolean,
        public usuarios?: BaseEntity[],
        public eventos?: BaseEntity[],
    ) {
        this.estado = false;
    }
}
