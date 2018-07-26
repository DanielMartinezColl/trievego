import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ciudad } from './ciudad.model';
import { CiudadPopupService } from './ciudad-popup.service';
import { CiudadService } from './ciudad.service';

@Component({
    selector: 'jhi-ciudad-delete-dialog',
    templateUrl: './ciudad-delete-dialog.component.html'
})
export class CiudadDeleteDialogComponent {

    ciudad: Ciudad;

    constructor(
        private ciudadService: CiudadService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ciudadService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ciudadListModification',
                content: 'Deleted an ciudad'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ciudad-delete-popup',
    template: ''
})
export class CiudadDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ciudadPopupService: CiudadPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ciudadPopupService
                .open(CiudadDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
