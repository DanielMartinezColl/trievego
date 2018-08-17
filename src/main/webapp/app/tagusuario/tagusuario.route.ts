import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../shared';
import { TagusuarioComponent } from './tagusuario.component';
import { TagusuarioPopupComponent } from './tagusuario-dialog.component';
import { TagusuarioDeletePopupComponent } from './tagusuario-delete-dialog.component';

@Injectable()
export class TagusuarioResolvePagingParams implements Resolve<any> {

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

export const tagusuarioRoute: Routes = [
    {
        path: 'tagusuario',
        component: TagusuarioComponent,
        resolve: {
            'pagingParams': TagusuarioResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.tagusuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tagusuarioPopupRoute: Routes = [
    {
        path: 'tagusuario-new',
        component: TagusuarioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.tagusuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tagusuario/:id/edit',
        component: TagusuarioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.tagusuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tagusuario/:id/delete',
        component: TagusuarioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.tagusuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
