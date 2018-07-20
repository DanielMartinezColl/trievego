import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ImagenComponent } from './imagen.component';
import { ImagenDetailComponent } from './imagen-detail.component';
import { ImagenPopupComponent } from './imagen-dialog.component';
import { ImagenDeletePopupComponent } from './imagen-delete-dialog.component';

@Injectable()
export class ImagenResolvePagingParams implements Resolve<any> {

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

export const imagenRoute: Routes = [
    {
        path: 'imagen',
        component: ImagenComponent,
        resolve: {
            'pagingParams': ImagenResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.imagen.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'imagen/:id',
        component: ImagenDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.imagen.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const imagenPopupRoute: Routes = [
    {
        path: 'imagen-new',
        component: ImagenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.imagen.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'imagen/:id/edit',
        component: ImagenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.imagen.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'imagen/:id/delete',
        component: ImagenDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.imagen.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
