import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { GeneroComponent } from './genero.component';
import { GeneroDetailComponent } from './genero-detail.component';
import { GeneroPopupComponent } from './genero-dialog.component';
import { GeneroDeletePopupComponent } from './genero-delete-dialog.component';

export const generoRoute: Routes = [
    {
        path: 'genero',
        component: GeneroComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.genero.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'genero/:id',
        component: GeneroDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.genero.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const generoPopupRoute: Routes = [
    {
        path: 'genero-new',
        component: GeneroPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.genero.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'genero/:id/edit',
        component: GeneroPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.genero.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'genero/:id/delete',
        component: GeneroDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.genero.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
