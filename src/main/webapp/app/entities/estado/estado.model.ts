import { BaseEntity } from './../../shared';

export class Estado implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
    ) {
    }
}
