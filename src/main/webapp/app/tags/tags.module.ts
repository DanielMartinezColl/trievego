import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrievegoSharedModule } from '../shared';
import {
    TagsService,
    TagsPopupService,
    TagsComponent,
    TagsDialogComponent,
    TagsPopupComponent,
    TagsDeletePopupComponent,
    TagsDeleteDialogComponent,
    tagsRoute,
    tagsPopupRoute,
    TagsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...tagsRoute,
    ...tagsPopupRoute,
];

@NgModule({
    imports: [
        TrievegoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TagsComponent,
        TagsDialogComponent,
        TagsDeleteDialogComponent,
        TagsPopupComponent,
        TagsDeletePopupComponent,
    ],
    entryComponents: [
        TagsComponent,
        TagsDialogComponent,
        TagsPopupComponent,
        TagsDeleteDialogComponent,
        TagsDeletePopupComponent,
    ],
    providers: [
        TagsService,
        TagsPopupService,
        TagsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrievegoTagsModule {}
