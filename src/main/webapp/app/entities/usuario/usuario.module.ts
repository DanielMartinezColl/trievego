import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrievegoSharedModule } from '../../shared';
import { TrievegoAdminModule } from '../../admin/admin.module';
import {
    UsuarioService,
    UsuarioPopupService,
    UsuarioComponent,
    UsuarioDetailComponent,
    UsuarioDialogComponent,
    UsuarioPopupComponent,
    UsuarioDeletePopupComponent,
    UsuarioDeleteDialogComponent,
    usuarioRoute,
    usuarioPopupRoute,
    UsuarioResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...usuarioRoute,
    ...usuarioPopupRoute,
];

@NgModule({
    imports: [
        TrievegoSharedModule,
        TrievegoAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UsuarioComponent,
        UsuarioDetailComponent,
        UsuarioDialogComponent,
        UsuarioDeleteDialogComponent,
        UsuarioPopupComponent,
        UsuarioDeletePopupComponent,
    ],
    entryComponents: [
        UsuarioComponent,
        UsuarioDialogComponent,
        UsuarioPopupComponent,
        UsuarioDeleteDialogComponent,
        UsuarioDeletePopupComponent,
    ],
    providers: [
        UsuarioService,
        UsuarioPopupService,
        UsuarioResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrievegoUsuarioModule {}
