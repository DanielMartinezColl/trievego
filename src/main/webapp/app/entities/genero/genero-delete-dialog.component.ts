import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Genero } from './genero.model';
import { GeneroPopupService } from './genero-popup.service';
import { GeneroService } from './genero.service';

@Component({
    selector: 'jhi-genero-delete-dialog',
    templateUrl: './genero-delete-dialog.component.html'
})
export class GeneroDeleteDialogComponent {

    genero: Genero;

    constructor(
        private generoService: GeneroService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.generoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'generoListModification',
                content: 'Deleted an genero'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-genero-delete-popup',
    template: ''
})
export class GeneroDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private generoPopupService: GeneroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.generoPopupService
                .open(GeneroDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
