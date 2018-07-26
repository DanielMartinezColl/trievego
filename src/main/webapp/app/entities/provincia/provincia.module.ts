import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrievegoSharedModule } from '../../shared';
import {
    ProvinciaService,
    ProvinciaPopupService,
    ProvinciaComponent,
    ProvinciaDetailComponent,
    ProvinciaDialogComponent,
    ProvinciaPopupComponent,
    ProvinciaDeletePopupComponent,
    ProvinciaDeleteDialogComponent,
    provinciaRoute,
    provinciaPopupRoute,
    ProvinciaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...provinciaRoute,
    ...provinciaPopupRoute,
];

@NgModule({
    imports: [
        TrievegoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProvinciaComponent,
        ProvinciaDetailComponent,
        ProvinciaDialogComponent,
        ProvinciaDeleteDialogComponent,
        ProvinciaPopupComponent,
        ProvinciaDeletePopupComponent,
    ],
    entryComponents: [
        ProvinciaComponent,
        ProvinciaDialogComponent,
        ProvinciaPopupComponent,
        ProvinciaDeleteDialogComponent,
        ProvinciaDeletePopupComponent,
    ],
    providers: [
        ProvinciaService,
        ProvinciaPopupService,
        ProvinciaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrievegoProvinciaModule {}
