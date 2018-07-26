import { Route } from '@angular/router';

import { RegistrarComponent } from './registrar.component';

export const registrarRoute: Route = {
    path: 'registrar',
    component: RegistrarComponent,
    data: {
        authorities: [],
        pageTitle: 'register.title'
    }
};
