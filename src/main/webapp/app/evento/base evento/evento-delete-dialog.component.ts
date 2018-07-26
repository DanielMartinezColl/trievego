import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Evento } from './evento.model';
import { EventoPopupService } from './evento-popup.service';
import { EventoService } from './evento.service';

@Component({
    selector: 'jhi-evento-delete-dialog',
    templateUrl: './evento-delete-dialog.component.html'
})
export class EventoDeleteDialogComponent {

    evento: Evento;

    constructor(
        private eventoService: EventoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.eventoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'eventoListModification',
                content: 'Deleted an evento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-evento-delete-popup',
    template: ''
})
export class EventoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventoPopupService: EventoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.eventoPopupService
                .open(EventoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
