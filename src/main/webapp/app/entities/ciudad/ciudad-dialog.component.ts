import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ciudad } from './ciudad.model';
import { CiudadPopupService } from './ciudad-popup.service';
import { CiudadService } from './ciudad.service';
import { Provincia, ProvinciaService } from '../provincia';

@Component({
    selector: 'jhi-ciudad-dialog',
    templateUrl: './ciudad-dialog.component.html'
})
export class CiudadDialogComponent implements OnInit {

    ciudad: Ciudad;
    isSaving: boolean;

    provincias: Provincia[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ciudadService: CiudadService,
        private provinciaService: ProvinciaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.provinciaService.query()
            .subscribe((res: HttpResponse<Provincia[]>) => { this.provincias = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ciudad.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ciudadService.update(this.ciudad));
        } else {
            this.subscribeToSaveResponse(
                this.ciudadService.create(this.ciudad));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Ciudad>>) {
        result.subscribe((res: HttpResponse<Ciudad>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Ciudad) {
        this.eventManager.broadcast({ name: 'ciudadListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProvinciaById(index: number, item: Provincia) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ciudad-popup',
    template: ''
})
export class CiudadPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ciudadPopupService: CiudadPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ciudadPopupService
                    .open(CiudadDialogComponent as Component, params['id']);
            } else {
                this.ciudadPopupService
                    .open(CiudadDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
