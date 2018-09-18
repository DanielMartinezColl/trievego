import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrievegoSharedModule } from '../shared';
import {
    EventousuarioService,
    EventousuarioPopupService,
    EventousuarioComponent,
    EventousuarioDetailComponent,
    EventousuarioDialogComponent,
    EventousuarioPopupComponent,
    EventousuarioDeletePopupComponent,
    EventousuarioDeleteDialogComponent,
    eventousuarioRoute,
    eventoPopupRoute,
    EventoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...eventousuarioRoute,
    ...eventoPopupRoute,
];

@NgModule({
    imports: [
        TrievegoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EventousuarioComponent,
        EventousuarioDetailComponent,
        EventousuarioDialogComponent,
        EventousuarioDeleteDialogComponent,
        EventousuarioPopupComponent,
        EventousuarioDeletePopupComponent,
    ],
    entryComponents: [
        EventousuarioComponent,
        EventousuarioDialogComponent,
        EventousuarioPopupComponent,
        EventousuarioDeleteDialogComponent,
        EventousuarioDeletePopupComponent,
    ],
    providers: [
        EventousuarioService,
        EventousuarioPopupService,
        EventoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrievegoEventousuarioModule {}
