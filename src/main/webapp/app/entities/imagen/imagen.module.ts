import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrievegoSharedModule } from '../../shared';
import {
    ImagenService,
    ImagenPopupService,
    ImagenComponent,
    ImagenDetailComponent,
    ImagenDialogComponent,
    ImagenPopupComponent,
    ImagenDeletePopupComponent,
    ImagenDeleteDialogComponent,
    imagenRoute,
    imagenPopupRoute,
    ImagenResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...imagenRoute,
    ...imagenPopupRoute,
];

@NgModule({
    imports: [
        TrievegoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ImagenComponent,
        ImagenDetailComponent,
        ImagenDialogComponent,
        ImagenDeleteDialogComponent,
        ImagenPopupComponent,
        ImagenDeletePopupComponent,
    ],
    entryComponents: [
        ImagenComponent,
        ImagenDialogComponent,
        ImagenPopupComponent,
        ImagenDeleteDialogComponent,
        ImagenDeletePopupComponent,
    ],
    providers: [
        ImagenService,
        ImagenPopupService,
        ImagenResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrievegoImagenModule {}
