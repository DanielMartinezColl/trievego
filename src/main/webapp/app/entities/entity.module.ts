import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TrievegoUsuarioModule } from './usuario/usuario.module';
import { TrievegoEventoModule } from './evento/evento.module';
import { TrievegoTagModule } from './tag/tag.module';
import { TrievegoCategoriaModule } from './categoria/categoria.module';
import { TrievegoCiudadModule } from './ciudad/ciudad.module';
import { TrievegoProvinciaModule } from './provincia/provincia.module';
import { TrievegoGeneroModule } from './genero/genero.module';
import { TrievegoEstadoModule } from './estado/estado.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TrievegoUsuarioModule,
        TrievegoEventoModule,
        TrievegoTagModule,
        TrievegoCategoriaModule,
        TrievegoCiudadModule,
        TrievegoProvinciaModule,
        TrievegoGeneroModule,
        TrievegoEstadoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrievegoEntityModule {}
