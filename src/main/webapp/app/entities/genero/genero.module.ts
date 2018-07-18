import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrievegoSharedModule } from '../../shared';
import {
    GeneroService,
    GeneroPopupService,
    GeneroComponent,
    GeneroDetailComponent,
    GeneroDialogComponent,
    GeneroPopupComponent,
    GeneroDeletePopupComponent,
    GeneroDeleteDialogComponent,
    generoRoute,
    generoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...generoRoute,
    ...generoPopupRoute,
];

@NgModule({
    imports: [
        TrievegoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GeneroComponent,
        GeneroDetailComponent,
        GeneroDialogComponent,
        GeneroDeleteDialogComponent,
        GeneroPopupComponent,
        GeneroDeletePopupComponent,
    ],
    entryComponents: [
        GeneroComponent,
        GeneroDialogComponent,
        GeneroPopupComponent,
        GeneroDeleteDialogComponent,
        GeneroDeletePopupComponent,
    ],
    providers: [
        GeneroService,
        GeneroPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrievegoGeneroModule {}
