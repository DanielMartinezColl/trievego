import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TrievegoUsuarioModule } from './usuario/usuario.module';
import { TrievegoEventoModule } from './evento/evento.module';
import { TrievegoImagenModule } from './imagen/imagen.module';
import { TrievegoTagModule } from './tag/tag.module';
import { TrievegoCategoriaModule } from './categoria/categoria.module';
import { TrievegoCiudadModule } from './ciudad/ciudad.module';
import { TrievegoProvinciaModule } from './provincia/provincia.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TrievegoUsuarioModule,
        TrievegoEventoModule,
        TrievegoImagenModule,
        TrievegoTagModule,
        TrievegoCategoriaModule,
        TrievegoCiudadModule,
        TrievegoProvinciaModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrievegoEntityModule {}
