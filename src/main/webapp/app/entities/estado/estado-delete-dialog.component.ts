import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Estado } from './estado.model';
import { EstadoPopupService } from './estado-popup.service';
import { EstadoService } from './estado.service';

@Component({
    selector: 'jhi-estado-delete-dialog',
    templateUrl: './estado-delete-dialog.component.html'
})
export class EstadoDeleteDialogComponent {

    estado: Estado;

    constructor(
        private estadoService: EstadoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estadoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'estadoListModification',
                content: 'Deleted an estado'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estado-delete-popup',
    template: ''
})
export class EstadoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estadoPopupService: EstadoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.estadoPopupService
                .open(EstadoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
