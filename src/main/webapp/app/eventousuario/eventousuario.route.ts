import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../shared';
import { EventousuarioComponent } from './eventousuario.component';
import { EventousuarioDetailComponent } from './eventousuario-detail.component';
import { EventousuarioPopupComponent } from './eventousuario-dialog.component';
import { EventousuarioDeletePopupComponent } from './eventousuario-delete-dialog.component';

@Injectable()
export class EventoResolvePagingParams implements Resolve<any> {

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

export const eventousuarioRoute: Routes = [
    {
        path: 'eventousuario',
        component: EventousuarioComponent,
        resolve: {
            'pagingParams': EventoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.evento.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'eventousuario/:id',
        component: EventousuarioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.evento.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eventoPopupRoute: Routes = [
    {
        path: 'eventousuario-new',
        component: EventousuarioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.evento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'eventousuario/:id/edit',
        component: EventousuarioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.evento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'eventousuario/:id/delete',
        component: EventousuarioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.evento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
