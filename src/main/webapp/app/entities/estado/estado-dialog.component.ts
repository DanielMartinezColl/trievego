import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Estado } from './estado.model';
import { EstadoPopupService } from './estado-popup.service';
import { EstadoService } from './estado.service';

@Component({
    selector: 'jhi-estado-dialog',
    templateUrl: './estado-dialog.component.html'
})
export class EstadoDialogComponent implements OnInit {

    estado: Estado;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private estadoService: EstadoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.estado.id !== undefined) {
            this.subscribeToSaveResponse(
                this.estadoService.update(this.estado));
        } else {
            this.subscribeToSaveResponse(
                this.estadoService.create(this.estado));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Estado>>) {
        result.subscribe((res: HttpResponse<Estado>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Estado) {
        this.eventManager.broadcast({ name: 'estadoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-estado-popup',
    template: ''
})
export class EstadoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estadoPopupService: EstadoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.estadoPopupService
                    .open(EstadoDialogComponent as Component, params['id']);
            } else {
                this.estadoPopupService
                    .open(EstadoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
