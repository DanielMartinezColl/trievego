import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrievegoSharedModule } from '../shared';
import { registrarRoute } from './registrar.route';
import { RegistrarComponent } from './registrar.component';
import { Registrar } from './registrar.service';

const ENTITY_STATES = [
    registrarRoute
];

@NgModule({
    imports: [
        TrievegoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RegistrarComponent
    ],
    entryComponents: [
        RegistrarComponent
    ],
    providers: [
        Registrar
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrievegoRegistrarModule {}
