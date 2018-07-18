import { BaseEntity, User } from './../../shared';

export class Tag implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public estado?: BaseEntity,
        public users?: User[],
        public eventos?: BaseEntity[],
    ) {
    }
}
