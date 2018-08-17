import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrievegoSharedModule } from '../shared';
import {
    TagusuarioService,
    TagusuarioPopupService,
    TagusuarioComponent,
    TagusuarioDialogComponent,
    TagusuarioPopupComponent,
    TagusuarioDeletePopupComponent,
    TagusuarioDeleteDialogComponent,
    tagusuarioRoute,
    tagusuarioPopupRoute,
    TagusuarioResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...tagusuarioRoute,
    ...tagusuarioPopupRoute,
];

@NgModule({
    imports: [
        TrievegoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TagusuarioComponent,
        TagusuarioDialogComponent,
        TagusuarioDeleteDialogComponent,
        TagusuarioPopupComponent,
        TagusuarioDeletePopupComponent,
    ],
    entryComponents: [
        TagusuarioComponent,
        TagusuarioDialogComponent,
        TagusuarioPopupComponent,
        TagusuarioDeleteDialogComponent,
        TagusuarioDeletePopupComponent,
    ],
    providers: [
        TagusuarioService,
        TagusuarioPopupService,
        TagusuarioResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrievegoTagusuarioModule {}
