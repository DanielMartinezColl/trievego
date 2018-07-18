import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CiudadComponent } from './ciudad.component';
import { CiudadDetailComponent } from './ciudad-detail.component';
import { CiudadPopupComponent } from './ciudad-dialog.component';
import { CiudadDeletePopupComponent } from './ciudad-delete-dialog.component';

@Injectable()
export class CiudadResolvePagingParams implements Resolve<any> {

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

export const ciudadRoute: Routes = [
    {
        path: 'ciudad',
        component: CiudadComponent,
        resolve: {
            'pagingParams': CiudadResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.ciudad.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ciudad/:id',
        component: CiudadDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.ciudad.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ciudadPopupRoute: Routes = [
    {
        path: 'ciudad-new',
        component: CiudadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.ciudad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ciudad/:id/edit',
        component: CiudadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.ciudad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ciudad/:id/delete',
        component: CiudadDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.ciudad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
