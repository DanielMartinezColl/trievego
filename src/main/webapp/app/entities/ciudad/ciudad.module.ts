import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrievegoSharedModule } from '../../shared';
import {
    CiudadService,
    CiudadPopupService,
    CiudadComponent,
    CiudadDetailComponent,
    CiudadDialogComponent,
    CiudadPopupComponent,
    CiudadDeletePopupComponent,
    CiudadDeleteDialogComponent,
    ciudadRoute,
    ciudadPopupRoute,
    CiudadResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...ciudadRoute,
    ...ciudadPopupRoute,
];

@NgModule({
    imports: [
        TrievegoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CiudadComponent,
        CiudadDetailComponent,
        CiudadDialogComponent,
        CiudadDeleteDialogComponent,
        CiudadPopupComponent,
        CiudadDeletePopupComponent,
    ],
    entryComponents: [
        CiudadComponent,
        CiudadDialogComponent,
        CiudadPopupComponent,
        CiudadDeleteDialogComponent,
        CiudadDeletePopupComponent,
    ],
    providers: [
        CiudadService,
        CiudadPopupService,
        CiudadResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrievegoCiudadModule {}
