import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EstadoComponent } from './estado.component';
import { EstadoDetailComponent } from './estado-detail.component';
import { EstadoPopupComponent } from './estado-dialog.component';
import { EstadoDeletePopupComponent } from './estado-delete-dialog.component';

export const estadoRoute: Routes = [
    {
        path: 'estado',
        component: EstadoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.estado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'estado/:id',
        component: EstadoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.estado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoPopupRoute: Routes = [
    {
        path: 'estado-new',
        component: EstadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.estado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado/:id/edit',
        component: EstadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.estado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado/:id/delete',
        component: EstadoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trievegoApp.estado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
