import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../shared';
import { TagsComponent } from './tags.component';
import { TagsPopupComponent } from './tags-dialog.component';
import { TagsDeletePopupComponent } from './tags-delete-dialog.component';

@Injectable()
export class TagsResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const tagsRoute: Routes = [
    {
        path: 'tags',
        component: TagsComponent,
        resolve: {
            'pagingParams': TagsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.tags.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tagsPopupRoute: Routes = [
    {
        path: 'tags-new',
        component: TagsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.tags.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tags/:id/edit',
        component: TagsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.tags.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tags/:id/delete',
        component: TagsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.tags.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
