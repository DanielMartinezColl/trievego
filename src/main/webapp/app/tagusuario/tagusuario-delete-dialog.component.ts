import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tag } from './tagusuario.model';
import { TagusuarioPopupService } from './tagusuario-popup.service';
import { TagusuarioService } from './tagusuario.service';

@Component({
    selector: 'jhi-tagusuario-delete-dialog',
    templateUrl: './tagusuario-delete-dialog.component.html'
})
export class TagusuarioDeleteDialogComponent {

    tagusuario: Tag;

    constructor(
        private tagusuarioService: TagusuarioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tagusuarioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tagusuarioListModification',
                content: 'Deleted an tagusuario'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tagusuario-delete-popup',
    template: ''
})
export class TagusuarioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tagusuarioPopupService: TagusuarioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tagusuarioPopupService
                .open(TagusuarioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
