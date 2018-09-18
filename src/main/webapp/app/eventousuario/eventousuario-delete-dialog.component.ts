import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Evento } from './eventousuario.model';
import { EventousuarioPopupService } from './eventousuario-popup.service';
import { EventousuarioService } from './eventousuario.service';

@Component({
    selector: 'jhi-eventousuario-delete-dialog',
    templateUrl: './eventousuario-delete-dialog.component.html'
})
export class EventousuarioDeleteDialogComponent {

    eventousuario: Evento;

    constructor(
        private eventousuarioService: EventousuarioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.eventousuarioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'eventousuarioListModification',
                content: 'Deleted an evento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-eventousuario-delete-popup',
    template: ''
})
export class EventousuarioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventousuarioPopupService: EventousuarioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.eventousuarioPopupService
                .open(EventousuarioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
