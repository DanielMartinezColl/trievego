import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrievegoSharedModule } from '../../shared';
import { TrievegoAdminModule } from '../../admin/admin.module';
import {
    EventoService,
    EventoPopupService,
    EventoComponent,
    EventoDetailComponent,
    EventoDialogComponent,
    EventoPopupComponent,
    EventoDeletePopupComponent,
    EventoDeleteDialogComponent,
    eventoRoute,
    eventoPopupRoute,
    EventoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...eventoRoute,
    ...eventoPopupRoute,
];

@NgModule({
    imports: [
        TrievegoSharedModule,
        TrievegoAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EventoComponent,
        EventoDetailComponent,
        EventoDialogComponent,
        EventoDeleteDialogComponent,
        EventoPopupComponent,
        EventoDeletePopupComponent,
    ],
    entryComponents: [
        EventoComponent,
        EventoDialogComponent,
        EventoPopupComponent,
        EventoDeleteDialogComponent,
        EventoDeletePopupComponent,
    ],
    providers: [
        EventoService,
        EventoPopupService,
        EventoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrievegoEventoModule {}
