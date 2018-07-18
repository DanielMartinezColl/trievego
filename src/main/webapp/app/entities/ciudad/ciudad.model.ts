import { BaseEntity } from './../../shared';

export class Ciudad implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public provincia?: BaseEntity,
    ) {
    }
}
