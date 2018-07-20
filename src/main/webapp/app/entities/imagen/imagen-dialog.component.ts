import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Imagen } from './imagen.model';
import { ImagenPopupService } from './imagen-popup.service';
import { ImagenService } from './imagen.service';
import { Evento, EventoService } from '../evento';

@Component({
    selector: 'jhi-imagen-dialog',
    templateUrl: './imagen-dialog.component.html'
})
export class ImagenDialogComponent implements OnInit {

    imagen: Imagen;
    isSaving: boolean;

    eventos: Evento[];
    fechaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private imagenService: ImagenService,
        private eventoService: EventoService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.eventoService.query()
            .subscribe((res: HttpResponse<Evento[]>) => { this.eventos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.imagen, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.imagen.id !== undefined) {
            this.subscribeToSaveResponse(
                this.imagenService.update(this.imagen));
        } else {
            this.subscribeToSaveResponse(
                this.imagenService.create(this.imagen));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Imagen>>) {
        result.subscribe((res: HttpResponse<Imagen>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Imagen) {
        this.eventManager.broadcast({ name: 'imagenListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEventoById(index: number, item: Evento) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-imagen-popup',
    template: ''
})
export class ImagenPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private imagenPopupService: ImagenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.imagenPopupService
                    .open(ImagenDialogComponent as Component, params['id']);
            } else {
                this.imagenPopupService
                    .open(ImagenDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
